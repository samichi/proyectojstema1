var dataParse = JSON.parse('{"usuarios":[{"id":1, "usuario":"Jenny","clave":"1234", "excursiones":[{"id":1, "titulo":"Animales", "portada":"./image/portadaAnimales.jpg", "descripcion":"Muestra los sonidos de los animales de la granja", "creditos":"ChuChuTv y GrupoJIM", "urlVideo":"https://www.youtube.com/watch?v=ftNOCfqoIjQ", "audioActividad":"./audio/actividadAnimal.mp3", "opciones":[{"imgUrl":"./image/vaca.png"},{"imgUrl":"./image/oveja.png"},{"imgUrl":"./image/caballo.png"}], "respuestaActividad":"./image/vaca.png", "respuestaUsuario":""},{"id":2, "titulo":"Frutas", "portada":"./image/portadaFrutas.jpg", "descripcion":"Muestra como identificar las frutas", "creditos":"ChuChuTv Y GrupoJIM", "urlVideo":"https://www.youtube.com/watch?v=kvC4_HBOnI0", "audioActividad":"./audio/actividadFruta.mp3","opciones":[{"imgUrl":"./image/banano.png"},{"imgUrl":"./image/manzanas.png"},{"imgUrl":"./image/naranjas.png"}], "respuestaActividad":"./image/banano.png", "respuestaUsuario":""}]}, {"id":2, "usuario":"Meche","clave":"1234", "excursiones":[{"id":1, "titulo":"Animales", "portada":"./image/portadaAnimales.jpg", "descripcion":"Muestra los sonidos de los animales de la granja", "creditos":"ChuChuTv y GrupoJIM", "urlVideo":"https://www.youtube.com/watch?v=ftNOCfqoIjQ", "audioActividad":"./audio/actividadAnimal.mp3", "opciones":[{"imgUrl":"./image/vaca.png"},{"imgUrl":"./image/oveja.png"},{"imgUrl":"./image/caballo.png"}], "respuestaActividad":"./image/vaca.png", "respuestaUsuario":""}]}]}');

var listaExcursion = JSON.parse('{"excursiones":[{"id":1, "titulo":"Animales", "portada":"./image/portadaAnimales.jpg", "descripcion":"Muestra los sonidos de los animales de la granja", "creditos":"ChuChuTv y GrupoJIM", "urlVideo":"https://www.youtube.com/watch?v=6qyKtYGILNA", "audioActividad":"./audio/actividadAnimal.mp3", "opciones":[{"imgUrl":"./image/vaca.png"},{"imgUrl":"./image/oveja.png"},{"imgUrl":"./image/caballo.png"}], "respuestaActividad":"./image/vaca.png", "respuestaUsuario":""},{"id":2, "titulo":"Frutas", "portada":"./image/portadaFrutas.jpg", "descripcion":"Muestra como identificar las frutas", "creditos":"ChuChuTv Y GrupoJIM", "urlVideo":"https://www.youtube.com/watch?v=ro4Rvp4Kc3s", "audioActividad":"./audio/actividadFruta.mp3","opciones":[{"imgUrl":"./image/banano.png"},{"imgUrl":"./image/manzanas.png"},{"imgUrl":"./image/naranjas.png"}], "respuestaActividad":"./image/banano.png", "respuestaUsuario":""},{"id":3,"titulo":"Numeros", "portada":"./image/portadaNumeros.jpg", "descripcion":"Muestra como contar del numero uno al numero cinco", "creditos":"ChuChuTv y GrupoJIM", "urlVideo":"https://www.youtube.com/watch?v=Isw1-oCe3N8", "audioActividad":"./audio/juegoTercero.mp3", "opciones":[{"imgUrl":"./image/uno.png"},{"imgUrl":"./image/dos.png"},{"imgUrl":"./image/tres.png"}], "respuestaActividad":"./image/dos.png", "respuestaUsuario":""}]}');

/*VARIABLES GLOBALES*/
var actividadAudioJuego;
var posicionArrayExcursion;
var idExcursion;
var idUsuario;
var usuarioNuevo;
var arrayListaExcursiones = [];
var usuariosArray = []; //Array de los usuarios donde cargará 
var usuarioEnUso;
var claveEnUSo;
//var respUsuario;
var respActividad;

/*CLASES*/
class Opcion {
  constructor (obj){
    this.imgUrl = obj.imgUrl;
  }
}

class Excursion {
  constructor(obj){
    this.id = obj.id;
    this.titulo = obj.titulo;
    this.portada = obj.portada;
    this.descripcion = obj.descripcion;
    this.creditos = obj.creditos;
    this.urlVideo = obj.urlVideo;
    this.audioActividad = obj.audioActividad;
    this.opciones = [];
    this.respuestaActividad = obj.respuestaActividad;
    this.respuestaUsuario = obj.respuestaUsuario;
  }
}

class Usuario {
  constructor(obj){
    this.id = obj.id;
    this.usuario = obj.usuario;
    this.clave = obj.clave;
    this.excursiones = [];  
  }
}

/*EVENTOS DE LOS BOTONES*/
//FUNCIONES DE LOS BOTONES DEL DIV CHUCHUTVPANTALLA

$ ( '#btnLoginGeneral' ).click(function(){
  $( '#chuChuTvPantalla' ).hide();
  $( '#usuarioLoginPantalla' ).show();
});

//FUNCIONES DE LOS BOTONES DEL DIV USUARIOLOGINPANTALLA

$( '#btnAccederUsuario' ).click(function(){
  usuarioEnUso = $( '#usuarioLoginNombre' ).val();
  claveEnUSo = $( '#usuarioLoginClave' ).val();
  if(usuarioEnUso  == "admin" &&  claveEnUSo == "1234"){
    $( '#usuarioLoginPantalla' ).hide();
    $( '#juegoMenuPrincipal' ).show(); //Pantalla boton lista Excursiones
  } else {
    for (const item of Object.values(usuariosArray)){
      if (usuarioEnUso == item.usuario && claveEnUSo == item.clave){
        idUsuario = item.id;
        //console.log(idUsuario);
        $( '#usuarioLoginPantalla' ).hide();
        $( '#juegoMenuPrincipal' ).show(); //Pantalla boton lista Excursiones
        $( '#btnJuegoVerExcursiones' ).hide();
      } else {
        //alert("Usuario y contraseña invalidos. Ingrese de nuevo...");
        $( '#usuarioLoginNombre' ).val("");
        $( '#usuarioLoginClave' ).val("");
      }
    }
  }
  /*
  for (const item of Object.values(usuariosArray)){
    if (usuarioEnUso == item.usuario && claveEnUSo == item.clave){
      idUsuario = item.id;
      //console.log(idUsuario);
      $( '#usuarioLoginPantalla' ).hide();
      $( '#juegoMenuPrincipal' ).show(); //Pantalla boton lista Excursiones
      $( '#btnJuegoVerExcursiones' ).hide();
    } else if( usuarioEnUso  == "admin" &&  claveEnUSo == "1234"){
      $( '#usuarioLoginPantalla' ).hide();
      $( '#juegoMenuPrincipal' ).show(); //Pantalla boton lista Excursiones
    }
    else{
      //alert("Password invalido.");
    }
  }*/
});

$ ( '#btnUsuarioSalirJuego' ).click(function(){
  $( '#usuarioRegistroPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#juegoExcursion' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
  $( '#usuarioLoginPantalla' ).hide();
  $( '#chuChuTvPantalla' ).show(); //Pantalla principal
});

$( '#btnNuevoUsuario').click(function(){
  $( '#chuChuTvPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#juegoExcursion' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).show();
});

//FUNCIONES DE LOS BOTONES DEL DIV USUARIOREGISTROPANTALLA

$( '#btnGuardarUsuario' ).click(function(){
  let datosUsuario = 
  {
    "id": usuariosArray.length,
    "usuario": $( '#usuarioRegistroNombre' ).val(),
    "clave": $( '#usuarioRegistroClave' ).val(),
    "excursiones":[]
  };

  usuarioNuevo = new Usuario (datosUsuario);
  //console.log (usuarioNuevo.clave);
  usuariosArray.push(usuarioNuevo);
  //mostrarArrayObjetos(usuariosArray);
  
});

$( '#btnNuevoUsuarioSalirJuego' ).click(function(){
  $( '#chuChuTvPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#juegoExcursion' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $( '#usuarioLoginPantalla' ).show();//Pantalla del login
});

//FUNCIONES DE LOS BOTONES DEL DIV JUEGOMENUPRINCIPAL

$( 'btnVideoIntroJuego' ).click(function(){
  $( '#chuChuTvPantalla' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#juegoExcursion' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).show();
});

//Boton para ir a la lista de Excursiones
$( '#btnJuegoListaExcursiones' ).click(function(){
  fillArrayExcursion();
  $( '#chuChuTvPantalla' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#juegoExcursion' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).show();

});

//Boton para CRUD excursiones(ADMINISTRADOR )
$( '#btnJuegoVerExcursiones' ).click(function(){
  $( '#chuChuTvPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#juegoExcursion' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $( '#juegoMenuPrincipal').hide();
  $( '#adminExcursionesCRUD' ).show();
  $( '#createExcursion' ).hide();
  $( '#editExcursion' ).hide();
});

//FUNCIONES DE LOS BOTONES DEL DIV LISTAEXCURSIONES
           //Excursiones
function fillArrayExcursion(){
  $('#tablaUsuarioExcursiones').empty();
  for (const item in arrayListaExcursiones){
    //posicionArrayExcursion = arrayListaExcursiones[item].id -1;
    $( '#tablaUsuarioExcursiones' ).append('<div class="responsive gallery2"><button type="button" class="btnExcursionActividad" onclick="llenarExcursiones(' 
    + arrayListaExcursiones[item].id + ')"><img class="portadaExcursionJuego" src="' + arrayListaExcursiones[item].portada 
    + '" alt="Portada_Excursion"><div>' + arrayListaExcursiones[item].titulo + '</div></button></div>' );
    //console.log(item);
  }
}

function llenarExcursiones(indexArray){
  $( '#chuChuTvPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $( '#juegoExcursion' ).show();
  $( '#descripcionExcursion' ).show();
  $( '#actividadExcursion' ).hide();
  mostrarInformacionExcursion(indexArray);
}

$('#btnCerrarExcursionesMenuUsuario').click(function(){
  $( '#chuChuTvPantalla' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#juegoExcursion' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $('#listaExcursiones').hide();
  //resetVarJuego();
  $('#juegoMenuPrincipal').show();

});

//FUNCIONES DE LOS BOTONES DEL DIV JUEGOEXCURSION

$('#btnMenuPrincipalRegresar').click(function() {
  resetVarJuego();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#juegoExcursion' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $('#juegoMenuPrincipal').hide();
  $('#chuChuTvPantalla').show();
  
    
});

//*****************************CARGA UNA EXCURSION**************************
function mostrarInformacionExcursion(indexArray){
      
  $( '#listaExcursiones' ).hide();
  let banderaExcursionRegistrada = 0;
  for (const item in arrayListaExcursiones){
    if (arrayListaExcursiones[item].id == indexArray){
      idExcursion = indexArray;
      // console.log(idExcursion);
      $( '#tituloExcursion' ).append(arrayListaExcursiones[item].titulo);
	     //<iframe class="video v1" width="560" height="315" src="https://youtu.be/A2YdbncJoPc" frameborder="0" allowfullscreen=""></iframe>
      //$('#videoExcursionCargar').html('<source src="'+ arrayListaExcursiones[item].urlVideo +'" type="video/mp4"></source>' );
      //$('#videoExcursionCargar').html('<iframe src="'+ arrayListaExcursiones[item].urlVideo +'"></iframe>' );
        let urlCargada = arrayListaExcursiones[item].urlVideo;
	let urlDestino = urlCargada.indexOf("https");
	if(urlDestino == -1){
		 $('#videoExcursionCargar').attr('src', urlCargada);
	}else{
		let patron = "https://www.youtube.com/watch?v=";
		let nuevoPatron = "https://www.youtube.com/embed/";
		urlCargada = urlCargada.replace(patron, nuevoPatron);
		$('#videoExcursionCargar').attr('src', urlCargada);
	}
      //$('#videoExcursionCargar').attr('src', arrayListaExcursiones[item].urlVideo);
      //document.getElementById('videoExcursionCargar').load();
      // console.log($('#videoExcursionCargar'));
      // $('#videoExcursionCargar').play();
      //$( '#videoExcursion video source' ).attr('src', arrayListaExcursiones[item].urlVideo);
      console.log(arrayListaExcursiones[item].urlVideo);
      $( '#descripcionExcursionSeleccionada' ).append(arrayListaExcursiones[item].descripcion);
      $( '#creditosExcursionSeleccionada' ).append(arrayListaExcursiones[item].creditos);
      $( '#btnPrimeraOpcionAct #imgPrimeraOpcion' ).attr('src',arrayListaExcursiones[item].opciones[0].imgUrl );
      $( '#btnSegundaOpcionAct #imgSegundaOpcion' ).attr('src', arrayListaExcursiones[item].opciones[1].imgUrl);
      $( '#btnTerceraOpcionAct #imgTerceraOpcion' ).attr('src', arrayListaExcursiones[item].opciones[2].imgUrl);
      respActividad = arrayListaExcursiones[item].respuestaActividad;
      actividadAudioJuego = arrayListaExcursiones[item].audioActividad;
      for(let itemVarUsuarios in usuariosArray){
        if(usuariosArray[itemVarUsuarios].id == idUsuario){
          for(let itemExcursion in usuariosArray[itemVarUsuarios].excursiones){
            if(idExcursion == usuariosArray[itemVarUsuarios].excursiones[itemExcursion].id){
              banderaExcursionRegistrada = 1;
              console.log("Actividad Realizada por el Usuario");
            } 
          }
          if (banderaExcursionRegistrada == 0){
            let datosExcursion = {
                  "id":arrayListaExcursiones[item].id,
                  "titulo":arrayListaExcursiones[item].titulo,
                  "portada":arrayListaExcursiones[item].portada,
                  "descripcion":arrayListaExcursiones[item].descripcion,
                  "creditos":"ChuChuTv y GrupoJIM",
                  "urlVideo":arrayListaExcursiones[item].urlVideo,
                  "audioActividad":arrayListaExcursiones[item].audioActividad,
                  "opciones":[
                  {
                  "imgUrl":arrayListaExcursiones[item].opciones[0].imgUrl
                  },
                  {
                  "imgUrl":arrayListaExcursiones[item].opciones[1].imgUrl
                  },
                  {
                  "imgUrl":arrayListaExcursiones[item].opciones[2].imgUrl
                  }
                  ],
                  "respuestaActividad":arrayListaExcursiones[item].respuestaActividad,
                  "respuestaUsuario":""
            };
            usuariosArray[itemVarUsuarios].excursiones.push(new Excursion(datosExcursion));
            console.log("Insercion de la excursion en el usuario");
            console.log(usuariosArray[itemVarUsuarios].excursiones);
          }
        }
      }
    }
  } 
}

$( '#irActividadExcursion' ).click(function(){
  //document.getElementById('videoExcursionCargar').pause();
  var detener= $('#videoExcursionCargar').attr("src");
	$('#videoExcursionCargar').attr("src",detener);
	
  $( '#chuChuTvPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $( '#descripcionExcursion' ).hide();
  $( '#juegoExcursion' ).show();
  $( '#actividadExcursion' ).show();
  resultadoActividadUsuario();
});

//FUNCIONES DE LOS BOTONES DEL DIV ACTIVIDADEXCURSION

$('#verRespuestaActividad').click(function(){
  $( '#chuChuTvPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#juegoExcursion' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $('#actividadExcursion').hide();
  $('#verRespuestaCorrectaDiv').show();
  $('#verRespuestaCorrectaActividad').attr('src', respActividad);
});

function resultadoActividadUsuario(){
  const rollSound = new Audio(actividadAudioJuego);
  rollSound.play();

  $( '#btnPrimeraOpcionAct' ).click(function(){
    let imagenUrlRespuesta = $( '#btnPrimeraOpcionAct #imgPrimeraOpcion' ).attr("src");
    for (const excursionPosicion in usuariosArray[idUsuario-1].excursiones){
      if (usuariosArray[idUsuario-1].excursiones[excursionPosicion].id == idExcursion){
        usuariosArray[idUsuario-1].excursiones[excursionPosicion].respuestaUsuario = $( '#imgPrimeraOpcion' ).attr("src");
        compararRespuestaUsuarioActividad($( '#imgPrimeraOpcion' ).attr("src"));
      }
    }
    $(this).prop('disabled',true);
    $('#btnSegundaOpcionAct').prop('disabled',true);
    $('#btnTerceraOpcionAct').prop('disabled',true);
    //console.log(idExcursion);
  });

  $( '#btnSegundaOpcionAct' ).click(function(){
    let imagenUrlRespuesta = $( '#btnSegundaOpcionAct #imgSegundaOpcion' ).attr("src");
    for (const excursionPosicion in usuariosArray[idUsuario-1].excursiones){
      if (usuariosArray[idUsuario-1].excursiones[excursionPosicion].id == idExcursion){
        usuariosArray[idUsuario-1].excursiones[excursionPosicion].respuestaUsuario = $( '#imgSegundaOpcion' ).attr("src");
        console.log(usuariosArray[idUsuario-1].excursiones[excursionPosicion].respuestaUsuario);
        compararRespuestaUsuarioActividad(usuariosArray[idUsuario-1].excursiones[excursionPosicion].respuestaUsuario);
      }
    }
    $(this).prop('disabled',true);
    $('#btnTerceraOpcionAct').prop('disabled',true);
    $('#btnPrimeraOpcionAct').prop('disabled',true);
    //console.log(idExcursion);
  });

  $( '#btnTerceraOpcionAct' ).click(function(){
    let imagenUrlRespuesta = $( '#btnTerceraOpcionAct #imgTerceraOpcion' ).attr("src");
    for (const excursionPosicion in usuariosArray[idUsuario-1].excursiones){
      if (usuariosArray[idUsuario-1].excursiones[excursionPosicion].id == idExcursion){
        usuariosArray[idUsuario-1].excursiones[excursionPosicion].respuestaUsuario = $( '#imgTerceraOpcion' ).attr("src");
        compararRespuestaUsuarioActividad($( '#imgTerceraOpcion' ).attr("src"));
      }
    }
    $(this).prop('disabled',true);
    $('#btnSegundaOpcionAct').prop('disabled',true);
    $('#btnPrimeraOpcionAct').prop('disabled',true);
    //console.log(idExcursion);
  });
}

function compararRespuestaUsuarioActividad(imgUrlRespUsuario){
  for (let item in arrayListaExcursiones){
    if(arrayListaExcursiones[item].id ==  idExcursion){
      let banderaRespuesta = 0;
      if (arrayListaExcursiones[item].respuestaActividad == imgUrlRespUsuario){
        respuestaCorrectaActividadFunction();
      } else {
        respuestaIncorrectaActividadFunction();
      }
    }
  }
}

function respuestaCorrectaActividadFunction(){
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  
  $( '#actividadExcursion' ).hide();
  $('#respuestaActividadJuego').show();
  $('#respuestaCorrectaUsuarioJuego').show();
  $('#respuestaErroneaUsuarioJuego').hide();
  const rollSound = new Audio("./audio/bien.mp3");
  rollSound.play();
   
}


$('#btnCerrarPopUp').click(function(){
    $( '#respuestaActividadJuego' ).hide();
    $( '#actividadExcursion' ).show();
  }); 


function respuestaIncorrectaActividadFunction(){
  $( '#actividadExcursion' ).hide();
  $('#respuestaActividadJuego').show();
  $('#respuestaCorrectaUsuarioJuego').hide();
  $('#respuestaErroneaUsuarioJuego').show();
  const rollSound = new Audio("./audio/mal.mp3");
  rollSound.play();
}

$('#btnRegresarListaExcursiones').click(function(){
  $('#juegoExcursion').hide();
  $('#listaExcursiones').show();
});


 function limpiarExcursion(){
   $('#descripcionExcursionSeleccionada').empty();
   $('#tituloExcursion').empty();
   $('#creditosExcursionSeleccionada').empty();
   $('#jp-type-single').empty();
   $('#videoExcursionCargar').empty();
   $('#btnTerceraOpcionAct').prop('disabled',false);
   $('#btnSegundaOpcionAct').prop('disabled',false);
   $('#btnPrimeraOpcionAct').prop('disabled',false);
 }
 
$('#btnRegresarActividadExcursion').click(function() {
   limpiarExcursion();
  //arrayListaExcursiones = [];
  $('#actividadExcursion').hide();
  $('#juegoExcursion').hide();
  $('#listaExcursiones').show();
    
});



//FUNCIONES DE LOS BOTONES DEL DIV VERRESPUESTACORRECTADIV



$('#btnCerrarRespuestaCorrectaDiv').click(function(){
  $('#verRespuestaCorrectaDiv').hide();
  $('#actividadExcursion').show();
  $('#juegoExcursion').show();
});

//FUNCIONES DE LOS BOTONES DEL DIV ADMINISTRADOR

function exportJSON() {
  let dataStr = '{"usuarios":' + JSON.stringify(this.usuariosArray) + '}' + '{"excursiones":' + JSON.stringify(this.arrayListaExcursiones) + '}';
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  let exportFileDefaultName = 'informacion.json';

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

function readListaArrayExcursion(){
  $('#contenidoTablaAdminExcursiones').html("");
  for (const item in arrayListaExcursiones){
    $('#contenidoTablaAdminExcursiones').append('<tr><td>' + arrayListaExcursiones[item].titulo + '</td><td>' +  arrayListaExcursiones[item].portada
    + '</td><td>' +  arrayListaExcursiones[item].descripcion + '</td><td>' + arrayListaExcursiones[item].urlVideo 
    + '</td><td>' + arrayListaExcursiones[item].creditos + '</td><td>' + arrayListaExcursiones[item].audioActividad 
    + '</td><td>' + arrayListaExcursiones[item].opciones[0].imgUrl + '</td><td>' + arrayListaExcursiones[item].opciones[1].imgUrl + '</td><td>' 
    + arrayListaExcursiones[item].opciones[2].imgUrl + '</td><td>' + arrayListaExcursiones[item].respuestaActividad 
    + '</td><td><button type="button" onclick="editListaArrayExcursion(' + arrayListaExcursiones[item].id + ')">Editar</button>' 
    + '</td><td><button type="button" onclick="deleteListaArrayExcursion(' + item + ')">Eliminar</button></td></tr>');
  }
}

//arrayListaExcursiones[item].id

function agregarElementoTablaExcursion(index){
  for (let item in arrayListaExcursiones){
    if(arrayListaExcursiones[item].id == index){
      $('#contenidoTablaAdminExcursiones').append('<tr><td>' + arrayListaExcursiones[item].titulo + '</td><td>' +  arrayListaExcursiones[item].portada
      + '</td><td>' +  arrayListaExcursiones[item].descripcion + '</td><td>' + arrayListaExcursiones[item].urlVideo + '</td><td>' 
      + arrayListaExcursiones[item].creditos + '</td><td>' + arrayListaExcursiones[item].audioActividad + '</td><td>' 
      + arrayListaExcursiones[item].opciones[0].imgUrl + '</td><td>' + arrayListaExcursiones[item].opciones[1].imgUrl + '</td><td>' 
      + arrayListaExcursiones[item].opciones[2].imgUrl + '</td><td>' + arrayListaExcursiones[item].respuestaActividad + 
      '</td><td><button type="button" onclick="editListaArrayExcursion(' + arrayListaExcursiones[item].id +
      ')">Editar</button>' + '</td><td><button type="button" onclick="deleteListaArrayExcursion(' + item + ')">Eliminar</button></td></tr>');
    }
  }
}

//arrayListaExcursiones[item].id

function itemArrayExcursionEditado(index){
  for (let item in arrayListaExcursiones){
    if(arrayListaExcursiones[item].id == index){
      arrayListaExcursiones[item].titulo = $('#titulo-exc2').val();
      arrayListaExcursiones[item].portada = $('#portada-exc2').val();
      arrayListaExcursiones[item].descripcion = $('#descripcion-exc2').val();
      arrayListaExcursiones[item].creditos = $('#creditos-exc2').val();
	    
	   let urlCargada =  $('#video-exc2').val();
		let urlDestino = urlCargada.indexOf("https");
		if(urlDestino == -1){
			arrayListaExcursiones[item].urlVideo = urlCargada;
			 //$('#videoExcursionCargar').attr('src', urlCargada);
		}else{
			let patron = "https://www.youtube.com/watch?v=";
			let nuevoPatron = "https://www.youtube.com/embed/";
			urlCargada = urlCargada.replace(patron, nuevoPatron);
			arrayListaExcursiones[item].urlVideo = urlCargada;
		} 
	    
      arrayListaExcursiones[item].audioActividad = $('#actividad-exc2').val();
      arrayListaExcursiones[item].opciones[0].imgUrl = $('#opcion1-exc2').val();
      arrayListaExcursiones[item].opciones[1].imgUrl = $('#opcion2-exc2').val();
      arrayListaExcursiones[item].opciones[2].imgUrl = $('#opcion3-exc2').val();
      arrayListaExcursiones[item].respuestaActividad =  $('#respuesta-exc2').val();
    }
  }
}

function editListaArrayExcursion(index){
  $('#readListaExcursiones').hide();
  $('#editExcursion').show();
  for (let item in arrayListaExcursiones){
    if(arrayListaExcursiones[item].id == index){
      $('#titulo-exc2').val(arrayListaExcursiones[item].titulo);
      $('#portada-exc2').val(arrayListaExcursiones[item].portada);
      $('#descripcion-exc2').val(arrayListaExcursiones[item].descripcion);
      $('#creditos-exc2').val(arrayListaExcursiones[item].creditos);
      $('#video-exc2').val(arrayListaExcursiones[item].urlVideo);
      $('#actividad-exc2').val(arrayListaExcursiones[item].audioActividad);
      $('#opcion1-exc2').val(arrayListaExcursiones[item].opciones[0].imgUrl);
      $('#opcion2-exc2').val(arrayListaExcursiones[item].opciones[1].imgUrl);
      $('#opcion3-exc2').val(arrayListaExcursiones[item].opciones[2].imgUrl);
      $('#respuesta-exc2').val(arrayListaExcursiones[item].respuestaActividad);
      itemIdExcursionEditar = index;
    }
  }
}

function deleteListaArrayExcursion(index){
  arrayListaExcursiones.splice(index, 1);
  //console.log(arrayListaExcursiones);
  $('#contenidoTablaAdminExcursiones').html("");
  readListaArrayExcursion();
}

/*--------------------------------------------------------------------------------------------------*/

function agregarElementoArrayExcursionUsuario(index){
  for (const item in arrayListaExcursiones){
    if(arrayListaExcursiones[item].id == index){
      $( '#tablaUsuarioExcursiones' ).append('<div class="responsive gallery2"><button type="button" class="btnExcursionActividad" onclick="llenarExcursiones(' 
      + arrayListaExcursiones[item].id + ')"><img class="portadaExcursionJuego src="' + arrayListaExcursiones[item].portada + '" alt="Portada_Excursion">'  
      + arrayListaExcursiones[item].titulo + '</div></button></div>' );
    }
  }
}
// $( '#tablaUsuarioExcursiones' ).append('<div class="responsive gallery"><button type="button" class="botoncito" style="color:#fff;" onclick="llenarExcursiones(' + arrayListaExcursiones[item].id + ')"><img src="https://bit.ly/2MVCqkX" alt="Cinque Terre" width="600" height="400"><div class="desc" style="color:#fff;">' + arrayListaExcursiones[item].titulo + '</div></button></div>' );


/*----------------------------------------------------------------------------------------------*/

function createListaArrayExcursion(){
	let nuevoUrlData;
	let urlCargada = $('#video-exc').val();
	let urlDestino = urlCargada.indexOf("https");
	if(urlDestino == -1){
		nuevoUrlData = urlCargada;
		//$('#videoExcursionCargar').attr('src', urlCargada);
	}else{
	let patron = "https://www.youtube.com/watch?v=";
	let nuevoPatron = "https://www.youtube.com/embed/";
	urlCargada = urlCargada.replace(patron, nuevoPatron);
	nuevoUrlData = urlCargada;
	//$('#videoExcursionCargar').attr('src', urlCargada);
}
  //console.log(lastPositionArrayExcursion);
  let datosNuevaExcursion = {
      "id":lastPositionArrayExcursion+1,
      "titulo":$('#titulo-exc').val(),
      "portada":$('#portada-exc').val(),
      "descripcion":$('#descripcion-exc').val(),
      "creditos":$('#creditos-exc').val(),
      "urlVideo":nuevoUrlData,
      "audioActividad":$('#actividad-exc').val(),
      "opciones":[],
      "respuestaActividad":$('#respuesta-exc').val(),
      "respuestaUsuario":""
  };
  let datosNuevaOpcion01 = {"imgUrl":$('#opcion1-exc').val()};
  let datosNuevaOpcion02 = {"imgUrl":$('#opcion2-exc').val()};
  let datosNuevaOpcion03 = {"imgUrl":$('#opcion3-exc').val()};
  let newObjImg01 = new Opcion(datosNuevaOpcion01);
  let newObjImg02 = new Opcion(datosNuevaOpcion02);
  let newObjImg03 = new Opcion(datosNuevaOpcion03);
  let newObjExc = new Excursion(datosNuevaExcursion);
  newObjExc.opciones.push(newObjImg01);
  newObjExc.opciones.push(newObjImg02);
  newObjExc.opciones.push(newObjImg03);
  //console.log(datosNuevaExcursion);
  arrayListaExcursiones.push(newObjExc);
  agregarElementoTablaExcursion(newObjExc.id);
  agregarElementoArrayExcursionUsuario(newObjExc.id);
  alert("Inserción Exitosa");
  console.log("Inserción Exitosa");
  //mostrarArrayObjetos (arrayListaExcursiones);
}

$( '#btnAdminRegresarMenu' ).click(function(){
  $('#adminExcursionesCRUD').hide();
  $('#juegoMenuPrincipal').show();
});

$('#btnEditarExcursionAdmin').click(function(){
  itemArrayExcursionEditado(itemIdExcursionEditar);
  $('#contenidoTablaAdminExcursiones').html("");
  readListaArrayExcursion();
});

$('#btnEditarRegresarCRUDAdmin').click(function(){
  $('#editExcursion').hide();
  $('#readListaExcursiones').show();
  
});

$( '#btnCrearNuevaExcursion' ).click(function(){
  $( '#readListaExcursiones' ).hide();
  $( '#createExcursion' ).show();
  
});

$('#btnGuardarNuevaExcursion').click(function(){
  createListaArrayExcursion();
});

$('#btnRegresarCRUDAdmin').click(function(){
  $('#createExcursion').hide();
  $('#readListaExcursiones').show();
});

$( '#btnJuegoVerExcursiones' ).click(function(){
  $( '#juegoMenuPrincipal' ).hide();
  $( '#adminExcursionesCRUD' ).show();
  readListaArrayExcursion();
  $( '#createExcursion' ).hide();
  $( '#editExcursion' ).hide();
});



/*
MOSTRAR ARRAY DE OBJETOS
Esta función ayuda a mostrar los datos superficiales de un array.
*/

function mostrarArrayObjetos (objArray){
  for (const objeto of Object.values(objArray)) {
    for (const i in objeto){
      console.log(objeto[i]);
    }
  }
}

/*
CARGAR DATA JSON
Esta función carga el json en el array de usuarios.
*/

function cargarDataJSON (){
  for (const objeto of Object.values(dataParse)) {  
    for (const i in objeto){
      let objUsuario = new Usuario (objeto[i]);
      //console.log(objeto[i].id);
      //console.log(objeto[i].usuario);
      //console.log(objeto[i].clave);
      for (const j in objeto[i].excursiones){
        objExcursion = new Excursion(objeto[i].excursiones[j]);
        //console.log(objeto[i].excursiones[j]);
        for(const k in objeto[i].excursiones[j].opciones){
          objExcursion.opciones.push(new Opcion (objeto[i].excursiones[j].opciones[k])); 
          //console.log(objeto[i].excursiones[j].opciones[k]); 
        }
        objUsuario.excursiones.push(objExcursion);
      }
      usuariosArray.push(objUsuario);
    }
  }
}

/*
CARGAR LISTA DE EXCURSIONES
Esta función carga el json en el array de excursiones.
*/

function cargarListaExcursiones (){
  for (let item of Object.values(listaExcursion)) {
    //console.log(item);
    for (const i in item){
      //console.log(item[i]);
      lastPositionArrayExcursion = item[i].id;
      let objExcursionItem = new Excursion (item[i]);
      for (const j in item[i].opciones){
        objExcursionItem.opciones.push(new Opcion(item[i].opciones[j]));
      }
      arrayListaExcursiones.push(objExcursionItem);  
    }
    
  }
  //console.log(arrayListaExcursiones);
}


/*
OCULTAR DIV
Solo deja el div principal.
*/

function ocultarDiv(){
  $( '#usuarioLoginPantalla' ).hide();
  $( '#usuarioRegistroPantalla' ).hide();
  $( '#juegoMenuPrincipal' ).hide();
  $( '#reproducirVideoIntro' ).hide();
  $( '#listaExcursiones' ).hide();
  $( '#juegoExcursion' ).hide();
  $( '#adminExcursionesCRUD' ).hide();
  $( '#respuestaActividadJuego' ).hide();
  $( '#verRespuestaCorrectaDiv' ).hide();
}

/*
RESETVARJUEGO
Resetear las variables
*/

function resetVarJuego(){
  usuarioEnUso = '';
  claveEnUSo = '';
  respActividad = '';
  actividadAudioJuego = '';
  posicionArrayExcursion = 0;
  idExcursion  = 0;
  idUsuario = 0;
}

window.onload = function () {
  cargarDataJSON();
  cargarListaExcursiones();
  //mostrarArrayObjetos(usuariosArray);
  ocultarDiv();  
  fillArrayExcursion();
}

/*$(document).ready(function() {
		$('.video').videoController({
			videoReady: function() { displayEvent('ready'); },
			videoStart: function() { displayEvent('start'); },
			videoPlay: function() { displayEvent('play'); },
			videoPause: function() { displayEvent('pause'); },
			videoEnded: function() { displayEvent('ended'); }
		});
	});
	function playVideo() {
		$('.video').videoController('play');
	}
	function pauseVideo() {
		$('.video').videoController('pause');
	}
	function stopVideo() {
		$('.video').videoController('stop');
	}*/



$('#actividad-exc').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#actividad-exc")[0].files[0];
	  alert(file);
    //obtenemos el nombre del archivo
    var fileName = file.name;
	     alert(fileName);
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
   // showMessageA("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});


$('#actividad-exc2').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#actividad-exc2")[0].files[0];
	  alert(file);
    //obtenemos el nombre del archivo
    var fileName = file.name;
	     alert(fileName);
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
   showMessage("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

$('.AgregarAudio').click(function () {
    //información del formulario
    var formData = new FormData($(".formulario")[0]);
    var message = "";
    //hacemos la petición ajax  
    $.ajax({
        url: ' ../php/subir.php',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
            message = $("<span\>Subiendo el audio, por favor espere...</span>");
            showMessage(message);
        },
        //una vez finalizado correctamente
        success: function (data) {
		alert("Inserto audio");
            message = $("<span\>El audio ha subido correctamente.</span>");
            showMessage(message);
            if (isImage(fileExtension)) {
                $(".fondoAudio").html("<audio controls><source src='../audio/" + data + "' type='audio/mp3'></audio>");
            
            }
        },
        //si ha ocurrido un error
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            showMessage(message);
        }
    });
});


function showMessage(message) {
    $(".messagesA").html("").show();
    $(".messagesA").html(message);
}

//comprobamos si el archivo a subir es una imagen
//para visualizarla una vez haya subido
function isImage(extension) {
    switch (extension.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'png':
        case 'jpeg':
            return true;
            break;
        case 'mp3':
        case 'wav':
        case 'mp4':
        case 'ogg':
            return true;
            break;
        default:
            return false;
            break;
    }
}

