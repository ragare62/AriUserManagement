using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AriUMModel;

namespace AriUMWebApi.Controllers
{
    public class LoginController : ApiController
    {
        public virtual HttpResponseMessage GetLogin(string login, string password)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                WebApiTicket tck = CntWebApiSecurity.Login(login,password,30,ctx);
                if (tck == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Nombre de usuario o contraseña incorrecto");
                }
                else
                {
                    // we must add the new ticket to the database
                    ctx.Add(tck);
                    ctx.SaveChanges();
                    tck = ctx.CreateDetachedCopy<WebApiTicket>(tck, x => x.User);
                    return Request.CreateResponse<WebApiTicket>(HttpStatusCode.OK, tck);
                }
            }
        }
    }
}
