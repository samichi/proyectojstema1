var dataParse = JSON.parse('{"usuarios":[{"id":1, "usuario":"Jenny","clave":"1234", "excursiones":[{"id":1, "titulo":"Animales", "descripcion":"Muestra los sonidos de los animales de la granja", "creditos":"ChuChuTv y GrupoJIM", "urlVideo":"https://chuchu-samichi.c9users.io/videos/animales.mp4", "audioActividad":"./audio/actividadAnimal.mp3", "opciones":[{"imgUrl":"https://chuchu-samichi.c9users.io/image/vaca.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/oveja.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/caballo.png"}], "respuestaActividad":"https://chuchu-samichi.c9users.io/image/vaca.png", "respuestaUsuario":""},{"id":2, "titulo":"Frutas", "descripcion":"Muestra como identificar las frutas", "creditos":"ChuChuTv Y GrupoJIM", "urlVideo":"https://chuchu-samichi.c9users.io/videos/frutas.mp4", "audioActividad":"./audio/actividadFruta.mp3","opciones":[{"imgUrl":"https://chuchu-samichi.c9users.io/image/banano.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/manzanas.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/naranjas.png"}], "respuestaActividad":"https://chuchu-samichi.c9users.io/image/banano.png", "respuestaUsuario":""}]}, {"id":2, "usuario":"Meche","clave":"1234", "excursiones":[{"id":1, "titulo":"Animales", "descripcion":"Muestra los sonidos de los animales de la granja", "creditos":"ChuChuTv y GrupoJIM", "urlVideo":"https://chuchu-samichi.c9users.io/videos/animales.mp4", "audioActividad":"./audio/actividadAnimal.mp3", "opciones":[{"imgUrl":"https://chuchu-samichi.c9users.io/image/vaca.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/oveja.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/caballo.png"}], "respuestaActividad":"https://chuchu-samichi.c9users.io/image/vaca.png", "respuestaUsuario":""}]}]}');

var listaExcursion = JSON.parse('{"excursiones":[{"id":1, "titulo":"Animales", "descripcion":"Muestra los sonidos de los animales de la granja", "creditos":"ChuChuTv y GrupoJIM", "urlVideo":"https://chuchu-integrated-sitio-cloned-samichi.c9users.io/videos/animales.mp4", "audioActividad":"./audio/actividadAnimal.mp3", "opciones":[{"imgUrl":"https://chuchu-samichi.c9users.io/image/vaca.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/oveja.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/caballo.png"}], "respuestaActividad":"https://chuchu-samichi.c9users.io/image/vaca.png", "respuestaUsuario":""},{"id":2, "titulo":"Frutas", "descripcion":"Muestra como identificar las frutas", "creditos":"ChuChuTv Y GrupoJIM", "urlVideo":"https://chuchu-integrated-sitio-cloned-samichi.c9users.io/videos/frutas.mp4", "audioActividad":"./audio/actividadFruta.mp3","opciones":[{"imgUrl":"https://chuchu-samichi.c9users.io/image/banano.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/manzanas.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/naranjas.png"}], "respuestaActividad":"https://chuchu-samichi.c9users.io/image/banano.png", "respuestaUsuario":""},{"id":3,"titulo":"Numeros", "descripcion":"Muestra como contar del numero uno al numero cinco", "creditos":"ChuChuTv y GrupoJIM", "urlVideo":"https://chuchu-integrated-sitio-cloned-samichi.c9users.io/videos/numeros.mp4", "audioActividad":"./audio/juegoTercero.mp3", "opciones":[{"imgUrl":"https://chuchu-samichi.c9users.io/image/uno.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/dos.png"},{"imgUrl":"https://chuchu-samichi.c9users.io/image/tres.png"}], "respuestaActividad":"https://chuchu-samichi.c9users.io/image/dos.png", "respuestaUsuario":""}]}');

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
  }
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
  for (const item in arrayListaExcursiones){
    //posicionArrayExcursion = arrayListaExcursiones[item].id -1;
    $( '#tablaUsuarioExcursiones' ).append('<div class="responsive gallery"><button type="button" class="botoncito" style="color:#fff;" onclick="llenarExcursiones(' + arrayListaExcursiones[item].id + ')"><img src="https://bit.ly/2MVCqkX" alt="Cinque Terre" width="600" height="400"><div class="desc" style="color:#fff;">' + arrayListaExcursiones[item].titulo + '</div></button></div>' );
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
  resetVarJuego();
    
});

