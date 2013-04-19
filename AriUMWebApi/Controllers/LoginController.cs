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
        public virtual WebApiTicket GetLogin(string usr, string passwd)
        {
            WebApiTicket tck = null;
            // Check if there's a user 
            return tck;
        }
    }
}
