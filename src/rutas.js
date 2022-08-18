'use strict'
const RUTA_SBS='http://serviciosweb.sbs.gob.pe/api/tipocambio/08082022';
const RUTA_ODATA='http://200.107.154.142:8000/sap/xi/zfi_int_tc_sbs/webfi?sap-client=200';
const TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWdyb3Zpc2lvbiIsInN1YiI6ImFncm92aXNpb24iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiTWFuYWdlciIsIlN1cGVydmlzb3IiXSwibmJmIjoxNjU5NzI4NzEwLCJleHAiOjE2OTEyNjQ3MTAsImlzcyI6Imh0dHA6Ly9qd3RhdXRoenNydi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6IjA5OTE1M2MyNjI1MTQ5YmM4ZWNiM2U4NWUwM2YwMDIyIn0._t7jCcMin_EhwsiWPoM0qSBSkbjF7EspmK1QByKv6a4';


module.exports ={
    token: TOKEN,
    rutaSBS: RUTA_SBS,
    rutaODATA: RUTA_ODATA,
}