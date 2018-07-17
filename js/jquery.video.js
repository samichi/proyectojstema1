/*! FAKTOR VIER Video Controller v0.2.0 | (c) 2015 FAKTOR VIER GmbH | http://faktorvier.ch */

// Youtube iframe api ready callback
function onYouTubeIframeAPIReady() {
	if(typeof $.video != 'undefined') {
		for(callback_index in $.video.global.youtube_api_ready_callbacks) {
			$.video.global.youtube_api_ready_callbacks[callback_index]();
		};
	}
}

// Add post message event listener for vimeo
var video_postmessage_event_func = 'attachEvent';
var video_postmessage_event = 'onmessage';

if(window.addEventListener) {
	video_postmessage_event_func = 'addEventListener';
	video_postmessage_event = 'message';
}

window[video_postmessage_event_func](
	video_postmessage_event,
	function(event) {
		if(!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
			return false;
		}

		var video_type = null;
		var video_data = JSON.parse(event.data);

		var video_event = ( typeof video_data.event == 'undefined' ? null : video_data.event );
		var video_method = ( typeof video_data.method == 'undefined' ? null : video_data.method );

		var $video = $('#' + video_data.player_id);
		var video_config = $video.getVideoConfig();

		if(video_config == null) {
			$video.initVideo();
			video_config = $video.getVideoConfig();
		}

		switch(video_event) {
			case 'ready':
				$.video.vimeo_postmessage($video, 'addEventListener', 'play');
				$.video.vimeo_postmessage($video, 'addEventListener', 'pause');
				$.video.vimeo_postmessage($video, 'addEventListener', 'finish');
				$.video.vimeo_postmessage($video, 'addEventListener', 'playProgress');

				$.video.vimeo_postmessage($video, 'getDuration');

				$video.data('video-player', $video);

				$video.attr(video_config.attr_ready, '');
				$video.setVideoInfo('status', 'ready');
				$video.setVideoInfo('progress', $.video.convert_time(0));

				$video.trigger('ready' + $.video.global.event_suffix);

				break;

			case 'play':
				$video.removeAttr(video_config.attr_paused);
				$video.attr(video_config.attr_playing, '');
				$video.setVideoInfo('status', 'playing');

				$video.trigger('play' + $.video.global.event_suffix);

				break;

			case 'playProgress':
				$video.setVideoInfo('progress', $.video.convert_time(video_data.data.seconds));

				$video.trigger('playProgress' + $.video.global.event_suffix);

				break;

			case 'pause':
				$video.removeAttr(video_config.attr_playing);
				$video.attr(video_config.attr_paused, '');
				$video.setVideoInfo('status', 'paused');

				$video.trigger('pause' + $.video.global.event_suffix);

				break;

			case 'finish':
				$video.removeAttr(video_config.attr_playing);
				$video.removeAttr(video_config.attr_paused);
				$video.setVideoInfo('status', 'finished');

				$video.trigger('finish' + $.video.global.event_suffix);

				break;
		}

		switch(video_method) {
			case 'getDuration':
				$video.setVideoInfo('duration', $.video.convert_time(video_data.value));
				break;
		}
	},
	false
);

(function($) {

	// Global object
	$.video = {
		global : {
			event_suffix: '_video',
			youtube_api_ready_callbacks: [],
			youtube_iframe_api: 'https://www.youtube.com/iframe_api'
		},
		config : {
			attr_ready: 'data-video-ready',
			attr_playing: 'data-video-playing',
			attr_paused: 'data-video-paused'
		}
	};

	/* PRIVATE FUNCTIONS */

	// Youtube player action
	var youtube_player_action = function($video, callback) {
		var video_config = $video.data('video').config;
		var video_progress_interval_id = null;
		var video_progress_interval_timeout = 1000;

		var video_progress_interval_id = null;
		var video_progress_interval_timeout = 1000;

		if(typeof $video.data('video-player') == 'undefined') {
			var ready_function = function() {
				var video_player = new YT.Player($video[0], {
					events: {
						'onReady': function(event) {
							$video.attr(video_config.attr_ready, '');
							$video.setVideoInfo('status', 'ready');
							$video.setVideoInfo('duration', $.video.convert_time(video_player.getDuration()));
							$video.setVideoInfo('progress', $.video.convert_time(video_player.getCurrentTime()));

							callback(event.target);
						},
						'onStateChange': function(event) {
							switch(event.data) {
								// Play
								case YT.PlayerState.PLAYING:
									$video.removeAttr(video_config.attr_paused);
									$video.attr(video_config.attr_playing, '');

									$video.setVideoInfo('status', 'playing');
									$video.setVideoInfo('progress', $.video.convert_time(video_player.getCurrentTime()));
									$video.trigger('play' + $.video.global.event_suffix);

									clearInterval(video_progress_interval_id);
									video_progress_interval_id = setInterval(function() {
										$video.setVideoInfo('progress', $.video.convert_time(video_player.getCurrentTime()));
										if($video.getVideoInfo('status') === 'playing') {
											$video.trigger('playProgress' + $.video.global.event_suffix);
										}
									}, video_progress_interval_timeout);
									break;
								// Pause
								case YT.PlayerState.PAUSED:
									$video.removeAttr(video_config.attr_playing);
									$video.attr(video_config.attr_paused, '');

									$video.setVideoInfo('status', 'paused');
									// clearInterval(video_progress_interval_id);
									// $video.setVideoInfo('progress', $.video.convert_time(video_player.getCurrentTime()));

									$video.trigger('pause' + $.video.global.event_suffix);

									break;
								// Finish
								case YT.PlayerState.ENDED:
									$video.removeAttr(video_config.attr_paused);
									$video.removeAttr(video_config.attr_playing);

									$video.setVideoInfo('status', 'finished');
									// clearInterval(video_progress_interval_id);
									// $video.setVideoInfo('progress', $.video.convert_time(video_player.getCurrentTime()));

									$video.trigger('finish' + $.video.global.event_suffix);

									break;
							}
						}
					}
				});

				$video.data('video-player', video_player);
			}

			if(typeof YT == 'undefined' || typeof YT.Player == 'undefined') {
				$.video.global.youtube_api_ready_callbacks.push(function() {
					ready_function();
				});

				// Append api script if not exists
				if($('script[src="https://www.youtube.com/iframe_api"]').length == 0 && $('script[src="http://www.youtube.com/iframe_api"]').length == 0) {
					$('<script></script>').attr('src', $.video.global.youtube_iframe_api).insertBefore($('script').first());
				}
			} else {
				ready_function();
			}
		} else {
			callback($video.data('video-player'));
		}
	}

	// Vimeo player action
	var vimeo_player_action = function($video, callback) {
		if(typeof $video.data('video-player') != 'undefined') {
			callback($video.data('video-player'));
		}
	}

	/* PUBLIC FUNCTIONS */

	// Create vimeo post message
	$.video.vimeo_postmessage = function(player, action, value) {
		var data = {
			method: action
		};

		if(value) {
			data.value = value;
		}

		if(typeof player[0] != 'undefined') {
			player[0].contentWindow.postMessage(JSON.stringify(data), '*');
		}
	}

	// convert duration to minutes and seconds
	$.video.convert_time = function(time) {
		var time_info = {};

		time_info.time = time;
		time_info.hours = Math.floor(time_info.time / 3600);
		time_info.minutes = Math.floor((time_info.time - (time_info.hours * 3600)) / 60);
		time_info.seconds = Math.round(time_info.time - (time_info.hours * 3600) - (time_info.minutes * 60));

		time_info.text = (time_info.hours < 10 ? "0" + time_info.hours : time_info.hours);
		time_info.text += ":" + (time_info.minutes < 10 ? "0" + time_info.minutes : time_info.minutes);
		time_info.text += ":" + (time_info.seconds  < 10 ? "0" + time_info.seconds : time_info.seconds);

		return time_info;
	}

	// Get video config
	$.fn.getVideoConfig = function() {
		var $video = $(this).first();

		return ( typeof $video.data('video') != 'undefined' ? $video.data('video').config : null )
	}

	// Set video info
	$.fn.setVideoInfo = function(key, value) {
		var $video = $(this).first();
		var video_data = $video.data('video');

		if(typeof video_data != 'undefined' && video_data.hasOwnProperty('info')) {

			if(typeof key === 'object') {
				video_data.info = $.extend(video_data.info, key);
			} else {
				video_data.info[key] = value;
			}

			$video.data('video', video_data);
		}
	}

	// Get video info
	$.fn.getVideoInfo = function(key) {
		var $video = $(this).first();
		var video_data = $video.data('video');

		if(typeof video_data != 'undefined' && video_data.hasOwnProperty('info')) {
			var key = key || null;
			if(key) {
				return (video_data.info.hasOwnProperty(key) ? video_data.info[key] : null);
			}

			return video_data.info;
		}

		return null;
	}

	// Get video player
	$.fn.getVideoPlayer = function() {
		var $video = $(this).first();

		return ( typeof $video.data('video-player') != 'undefined' ?  $video.data('video-player') : null )
	}

	// Get video type
	$.fn.getVideoType = function() {
		var $video = $(this).first();

		if($video.prop('tagName').toLowerCase() == 'video') {
			video_type = 'video';
		} else if($video.attr('src').indexOf('youtube.com/embed') !== -1) {
			video_type = 'youtube';
		} else if($video.attr('src').indexOf('player.vimeo.com/video') !== -1) {
			video_type = 'vimeo';
		} else {
			video_type = 'undefined'
		}

		return video_type;
	}

	// Init
	$.fn.initVideo = function(config) {
		return this.each(function() {
			var $video = $(this);
			var video_type = $video.getVideoType();
			//var video_player = $video.getVideoPlayer();
			var video_config = $video.getVideoConfig();
			var video_info = $video.getVideoInfo();

			if(video_config == null) {
				video_config = $.extend($.extend({}, $.video.config), config);
				$video.data('video', { config : video_config, info : {} });
			} else {
				console.warn('Player already initialized!');
				return false;
			}

			// Enable js api if not alreay enabled
			if(video_type == 'youtube') {
				if($video.attr('src').indexOf('enablejsapi=true') == -1 && $video.attr('src').indexOf('enablejsapi=1') == -1) {
					if($video.attr('src').indexOf('?') == -1) {
						$video.attr('src', $video.attr('src') + '?enablejsapi=1');
					} else {
						$video.attr('src', $video.attr('src') + '&enablejsapi=1');
					}
				}
			} else if(video_type == 'vimeo') {
				if($video.attr('src').indexOf('api=true') == -1 && $video.attr('src').indexOf('api=1') == -1) {
					if($video.attr('src').indexOf('?') == -1) {
						$video.attr('src', $video.attr('src') + '?api=1');
					} else {
						$video.attr('src', $video.attr('src') + '&api=1');
					}
				}

				if($video.attr('src').indexOf('player_id=') == -1) {
					var player_id = $video.attr('id');

					if(typeof player_id == 'undefined') {
						player_id = 'video-' + Math.round(new Date().getTime() + (Math.random() * 100));
						$video.attr('id', player_id)
					}

					if($video.attr('src').indexOf('?') == -1) {
						$video.attr('src', $video.attr('src') + '?player_id=' + player_id);
					} else {
						$video.attr('src', $video.attr('src') + '&player_id=' + player_id);
					}
				}
			}

			// HTML5
			if(video_type == 'video') {
				var video_player = $video.get(0);
				var video_interval_id = null;
				var video_interval_timeout = 1000;

				var oncanplay = function() {
					video_player.removeEventListener('canplaythrough', oncanplay, false);
					$video.attr(video_config.attr_ready, '');
					$video.trigger('ready' + $.video.global.event_suffix);
					$video.setVideoInfo('status', 'ready');
					$video.setVideoInfo('duration', $.video.convert_time(video_player.duration));
					$video.setVideoInfo('progress', $.video.convert_time(video_player.currentTime));
				}

				// Ready
				if(video_player.readyState == 4) {
					oncanplay();
				} else {
					video_player.addEventListener(
						'canplaythrough',
						oncanplay,
						false
					);
				}

				// Play
				$video.bind('play', function() {
					$video.removeAttr(video_config.attr_paused);
					$video.attr(video_config.attr_playing, '');
					$video.setVideoInfo('status', 'playing');

					clearInterval(video_interval_id);
					video_interval_id = setInterval(function(){
						$video.trigger('playProgress' + $.video.global.event_suffix);
					}, video_interval_timeout);

					$video.trigger('play' + $.video.global.event_suffix);
				});

				// Progress
				$video.bind('timeupdate', function() {
					$video.setVideoInfo('progress', $.video.convert_time(video_player.currentTime));
				});

				// Pause
				$video.bind('pause', function() {
					$video.removeAttr(video_config.attr_playing);
					$video.attr(video_config.attr_paused, '');
					$video.setVideoInfo('status', 'paused');
					$video.setVideoInfo('progress', $.video.convert_time(video_player.currentTime));
					clearInterval(video_interval_id);

					$video.trigger('pause' + $.video.global.event_suffix);
				});

				// Finish
				$video.bind('ended', function() {
					$video.removeAttr(video_config.attr_playing);
					$video.removeAttr(video_config.attr_paused);
					$video.setVideoInfo('status', 'finished');
					$video.setVideoInfo('progress', $.video.convert_time(video_player.currentTime));
					clearInterval(video_interval_id);

					$video.trigger('finish' + $.video.global.event_suffix);
				});

				$video.data('video-player', video_player);
			} else if(video_type == 'youtube') {
				// Youtube
				youtube_player_action(
					$video,
					function(player) {
						$video.trigger('ready' + $.video.global.event_suffix);
					}
				);
			} else if(video_type == 'vimeo') {
				// Vimeo
				vimeo_player_action(
					$video,
					function(player) {
						$video.trigger('ready' + $.video.global.event_suffix);
					}
				);
			}
		});
	}

	// Play
	$.fn.playVideo = function() {
		return this.each(function() {
			var $video = $(this);
			var video_type = $video.getVideoType();
			var video_player = $video.getVideoPlayer();

			// Check if player is initialized
			if(video_player == null) {
				console.warn('Player not initialized!');
				return false;
			}

			if(video_type == 'video') {
				// HTML5
				video_player.play();
			} else if(video_type == 'youtube') {
				// Youtube
				youtube_player_action(
					$video,
					function(player) {
						player.playVideo();
					}
				);
			} else if(video_type == 'vimeo') {
				// Vimeo
				vimeo_player_action(
					$video,
					function(player) {
						$.video.vimeo_postmessage(player, 'play');
					}
				);
			}
		});
	}

	// Pause
	$.fn.pauseVideo = function() {
		return this.each(function() {
			var $video = $(this);
			var video_type = $video.getVideoType();
			var video_player = $video.getVideoPlayer();

			// Check if player is initialized
			if(video_player == null) {
				console.warn('Player not initialized!');
				return false;
			}

			if(video_type == 'video') {
				// HTML5
				video_player.pause();
			} else if(video_type == 'youtube') {
				// Youtube
				youtube_player_action(
					$video,
					function(player) {
						player.pauseVideo();
					}
				);
			} else if(video_type == 'vimeo') {
				// Vimeo
				vimeo_player_action(
					$video,
					function(player) {
						$.video.vimeo_postmessage(player, 'pause');
					}
				);
			}
		});
	}

	// Stop
	$.fn.stopVideo = function() {
		return this.each(function() {
			var $video = $(this);
			var video_type = $video.getVideoType();
			var video_player = $video.getVideoPlayer();

			// Check if player is initialized
			if(video_player == null) {
				console.warn('Player not initialized!');
				return false;
			}

			if(video_type == 'video') {
				// HTML5
			
				// tocheck: video_player.currentTime = 0;
               
              video_player.currentTime = 30000;
				// tocheck: $video.setVideoInfo('progress', $.video.convert_time(video_player.currentTime));
				video_player.pause();
			} else if(video_type == 'youtube') {
				// Youtube
				youtube_player_action(
					$video,
					function(player) {
						player.seekTo(player.getDuration());
					}
				);
			} else if(video_type == 'vimeo') {
				// Vimeo
				vimeo_player_action(
					$video,
					function(player) {
						// TODO: Get duration and jump to end
						$.video.vimeo_postmessage(player, 'unload');
					}
				);
			}
		});
	}

	// Restart
	$.fn.restartVideo = function() {
		return this.each(function() {
			var $video = $(this);
			var video_type = $video.getVideoType();
			var video_player = $video.getVideoPlayer();
			var video_config = $video.getVideoConfig();

			// Check if player is initialized
			if(video_player == null) {
				console.warn('Player not initialized!');
				return false;
			}

			if(video_type == 'video') {
				// HTML5
				video_player.currentTime = 0;
				// tocheck: $video.setVideoInfo('progress', $.video.convert_time(video_player.currentTime));
				video_player.play();
			} else if(video_type == 'youtube') {
				// Youtube
				youtube_player_action(
					$video,
					function(player) {
						player.seekTo(0);
						// tocheck: $video.setVideoInfo('progress', $.video.convert_time(player.getCurrentTime()));
						player.playVideo();
						$video.trigger('restart' + $.video.global.event_suffix);
					}
				);
			} else if(video_type == 'vimeo') {
				// Vimeo
				vimeo_player_action(
					$video,
					function(player) {
						$.video.vimeo_postmessage(player, 'seekTo', '0');
						$.video.vimeo_postmessage(player, 'play');
						$video.trigger('restart' + $.video.global.event_suffix);
					}
				);
			}
		});
	}

	// Mute
	$.fn.muteVideo = function() {
		return this.each(function() {
			var $video = $(this);
			var video_type = $video.getVideoType();
			var video_player = $video.getVideoPlayer();

			// Check if player is initialized
			if(video_player == null) {
				console.warn('Player not initialized!');
				return false;
			}

			if(video_type == 'video') {
				// HTML5
				video_player.muted = true;
			} else if(video_type == 'youtube') {
				// Youtube
				youtube_player_action(
					$video,
					function(player) {
						player.mute();
					}
				);
			} else if(video_type == 'vimeo') {
				// Vimeo
				vimeo_player_action(
					$video,
					function(player) {
						$.video.vimeo_postmessage(player, 'setVolume', '0');
					}
				);
			}
		});
	}

	// Unmute
	$.fn.unmuteVideo = function() {
		return this.each(function() {
			var $video = $(this);
			var video_type = $video.getVideoType();
			var video_player = $video.getVideoPlayer();

			// Check if player is initialized
			if(video_player == null) {
				console.warn('Player not initialized!');
				return false;
			}

			if(video_type == 'video') {
				// HTML5
				video_player.muted = false;
			} else if(video_type == 'youtube') {
				// Youtube
				youtube_player_action(
					$video,
					function(player) {
						player.unMute();
					}
				);
			} else if(video_type == 'vimeo') {
				// Vimeo
				vimeo_player_action(
					$video,
					function(player) {
						$.video.vimeo_postmessage(player, 'setVolume', 1);
					}
				);
			}
		});
	}

	// Seek to
	$.fn.seekToVideo = function(seconds) {
		return this.each(function() {
			var $video = $(this);
			var video_type = $video.getVideoType();
			var video_player = $video.getVideoPlayer();

			// Check if player is initialized
			if(video_player == null) {
				console.warn('Player not initialized!');
				// tocheck: $video.setVideoInfo('progress', $.video.convert_time(0));
				return false;
			}

			if(video_type == 'video') {
				// HTML5
				video_player.currentTime = seconds;
			} else if(video_type == 'youtube') {
				// Youtube
				youtube_player_action(
					$video,
					function(player) {
						player.seekTo(seconds);
						$video.setVideoInfo('progress', $.video.convert_time(seconds));
					}
				);
			} else if(video_type == 'vimeo') {
				// Vimeo
				vimeo_player_action(
					$video,
					function(player) {
						$.video.vimeo_postmessage(player, 'seekTo', seconds);
					}
				);
			}

		});
	}

	// Destroy
	$.fn.destroyVideo = function() {
		return this.each(function() {
			var $video = $(this);
			var video_type = $video.getVideoType();
			var video_player = $video.getVideoPlayer();
			var video_config = $video.getVideoConfig();

			if(video_config != null) {
				// Remove data
				$video.removeData('video');
				$video.removeData('video-player');

				// Remove attrs
				$video.removeAttr(video_config.attr_ready);
				$video.removeAttr(video_config.attr_playing);
				$video.removeAttr(video_config.attr_paused);

				// Callback
				$video.trigger('destroy' + $.video.global.event_suffix);
			}
		});
	}

	// Add event
	$.fn.addVideoEvent = function(eventType, handler) {
		return this.each(function() {
			var $video = $(this);
			var video_type = $video.getVideoType();
			var video_player = $video.getVideoPlayer();

			// Trigger play event if html5 video autoplay
			if(eventType == 'play' && video_type == 'video' && typeof $video.get(0).paused != 'undefined' && !$video.get(0).paused) {
				handler(null, $video, video_type, video_player);
			}

			$video.bind(
				eventType + $.video.global.event_suffix,
				function(e) {
					handler(e, $video, video_type, video_player);
				}
			);
		});
	}

	// Remove event
	$.fn.removeVideoEvent = function(eventType) {
		return this.each(function() {
			var $video = $(this);

			$video.unbind(eventType + $.video.global.event_suffix);
		});
	}

	// Main binding
	$.fn.video = function() {
		var video_action = 'init';
		var video_args = {};

		if(typeof arguments[0] == 'string') {
			video_action = arguments[0];
			video_args = arguments[1];
		} else {
			video_args = arguments[0]
		}

		// Bind each video
		return this.each(function() {
			var $video = $(this);

			switch(video_action) {
				case 'init':
					$video.initVideo(video_args);
					break;

				case 'play':
					$video.playVideo();
					break;

				case 'pause':
					$video.pauseVideo();
					break;

				case 'stop':
					$video.stopVideo();
					break;

				case 'restart':
					$video.restartVideo();
					break;

				case 'mute':
					$video.muteVideo();
					break;

				case 'unmute':
					$video.unmuteVideo();
					break;

				case 'seekTo':
					$video.seekToVideo(video_args);
					break;

				case 'destroy':
					$video.destroyVideo();
					break;

				case 'addEvent':
					$video.addVideoEvent(video_args[0], video_args[1]);
					break;

				case 'removeEvent':
					$video.removeVideoEvent(video_args[0]);
					break;

				default:
					console.warn('Video action "' + video_action + '" not found');
			}
		});
	};

}(jQuery));