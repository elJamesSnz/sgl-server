const MENU_LIST = {
  nombre: "Miguel Salomon Lazcano",
  boleta: "2019640377",
  Carrera: "Telematica",
};
module.exports = {
  content: [
    {
      image: "./imagenes/upiita.png",
      fit: [80, 80],
      style: "imagenes",
      image: "./imagenes/ipn.png",
      fit: [80, 80],
    },

    {
      text: "Documento de no adeudo \n ",
      style: "header",
    },

    {
      text: "El sistema de gestion de laboratorios avala que el alumno \n ",
      style: "label",
    },
    {
      text: `${MENU_LIST.nombre} \n `,
      style: "header",
    },
    {
      text: `Con numero de boleta ${MENU_LIST.boleta}, el cual se encuentra inscrito en la carrera de ${MENU_LIST.Carrera} 
      no adeuda ningun material ni equipo dentro de los laboratorios de: \n 
      Fisica 1 \n 
      Fisica 2 \n 
      Electronica 1 \n
      Electronica 2 \n 
      Electronica 3 \n 
      Sistemas Digitales 1 \n 
      Sistemas Digitales 2 \n 
      Quimica y Biologia \n 
      Metrologia \n 
      Maquinas y Herramientas \n  
    `,
      style: "label",
    },
  ],
};
