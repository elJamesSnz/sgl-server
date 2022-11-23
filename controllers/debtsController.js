//CONTROLADOR DEBT
const Debt = require("../models/debt");

module.exports = {
  async PostAdeudo(req, res, next) {
    try {
      //Se recuperan las variables del body de la request

      const reqBoleta_adeudo = req.body.Boleta_adeudo;
      const reqId_laboratorio_adeudo = req.body.Id_laboratorio_adeudo;
      const reqId_equipo_adeudo = req.body.Id_equipo_adeudo;
      const reqId_componente_adeudo = req.body.Id_componente_adeudo;
      const reqFecha_alta = req.body.Fecha_alta;
      const reqFecha_entrega = req.body.Fecha_entrega;
      const reqId_profesor_adeudo = req.body.Id_profesor_adeudo;
      const reqAsignatura_adeudo = req.body.Asignatura_adeudo;
      const reqEstatus_adeudo = req.body.Estatus_adeudo;
      // const reqVisualizacion_adeudo = req.body.Visualizacion_adeudo;

      const data = {
        Boleta_adeudo: reqBoleta_adeudo,
        Id_laboratorio_adeudo: reqId_laboratorio_adeudo,
        Id_equipo_adeudo: reqId_equipo_adeudo,
        Id_componente_adeudo: reqId_componente_adeudo,
        Fecha_alta: reqFecha_alta,
        Fecha_entrega: reqFecha_entrega,
        Id_profesor_adeudo: reqId_profesor_adeudo,
        Asignatura_adeudo: reqAsignatura_adeudo,
        Estatus_adeudo: reqEstatus_adeudo,
        Visualizacion_adeudo: 1,
      };

      const res = await Debt.PostAdeudo(data);

      return res.status(201).json({
        success: true,
        data: data,

        message: "Adeudo agregado correctamente",
      });
    } catch (error) {
      console.log(`Error adeudo. ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al ingresar adeudo",
        error: error,
      });
    }
  },
  async UpdateAdeudo(req, res, next) {
    try {
      const Id_adeudo = req.query.Id_adeudo;
      const Boleta_adeudo = req.query.Boleta_adeudo;
      const Id_laboratorio_adeudo = req.query.Id_laboratorio_adeudo;
      const Id_equipo_adeudo = req.query.Id_equipo_adeudo;
      const Id_componente_adeudo = req.query.Id_componente_adeudo;
      const Fecha_alta = req.query.Fecha_alta;
      const Fecha_entrega = req.query.Fecha_entrega;
      const Id_profesor_adeudo = req.query.Id_profesor_adeudo;
      const Asignatura_adeudo = req.query.Asignatura_adeudo;
      const Estatus_adeudo = req.query.Estatus_adeudo;
      const Visualizacion_adeudo = req.query.Visualizacion_adeudo;

      const data = await Debt.UpdateAdeudo(
        Id_adeudo,
        Boleta_adeudo,
        Id_laboratorio_adeudo,
        Id_equipo_adeudo,
        Id_componente_adeudo,
        Fecha_alta,
        Fecha_entrega,
        Id_profesor_adeudo,
        Asignatura_adeudo,
        Estatus_adeudo,
        Visualizacion_adeudo
      );
      return res.status(201).json({
        success: true,
        message: "Adeudos editados correctamente",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener editar adeudos",
      });
    }
  },
  async DebtByLab(req, res, next) {
    try {
      const id = req.query.idLab;
      const data = await User.DebtByLab(id);
      return res.status(201).json({
        success: true,
        message: "Adeudos por laboratorios recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener equipos por laboratorios",
      });
    }
  },

  async AllDebts(req, res, next) {
    try {
      const data = await User.AllDebts();
      return res.status(201).json({
        success: true,
        message: "Adeudos recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener adeudos",
      });
    }
  },

  async DebtByBoletaAdeudo(req, res, next) {
    try {
      const boleta = req.query.boleta;
      console.log(boleta);
      const data = await User.DebtByBoletaAdeudo(boleta);
      return res.status(201).json({
        success: true,
        message: "Adeudos por Boleta recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener adeudo por Boleta",
      });
    }
  },

  async DebtByBoletaNoAdeudo(req, res, next) {
    try {
      const boleta = req.query.boleta;
      console.log(boleta);
      const data = await User.DebtByBoletaNoAdeudo(boleta);
      return res.status(201).json({
        success: true,
        message: "No Adeudos por Boleta recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener no adeudo por Boleta",
      });
    }
  },

  async Debt(req, res, next) {
    try {
      const id = req.query.idLab;
      console.log(id);
      const data = await User.Debt(id);
      return res.status(201).json({
        success: true,
        message: "Adeudos por laboratorios recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener equipos por laboratorios",
      });
    }
  },
  async UpdateEstatus(req, res, next) {
    try {
      const boleta = req.query.boleta;
      const idequipo = req.query.idequipo;

      const data = await User.UpdateEstatus(boleta, idequipo);
      return res.status(201).json({
        success: true,
        message: "Adeudos editados correctamente",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener editar adeudos",
      });
    }
  },
};
