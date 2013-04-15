using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AriUMModel;
using Telerik.OpenAccess;
using Telerik.OpenAccess.FetchOptimization;

namespace AriUMWebApi.Controllers
{
    public class InvoicesController : ApiController
    {
        // GET api/products
        public IEnumerable<Invoice> Get()
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                IEnumerable<Invoice> invoice = CntWebApiVerbs.GetInvoices(ctx);
                IEnumerable<Invoice> iS = ctx.CreateDetachedCopy<IEnumerable<Invoice>>(invoice);
                return iS;
            }
        }


        // GET api/products/5
        public virtual Invoice Get(int id)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                Invoice invoice = CntWebApiVerbs.GetInvoice(id, ctx);
                if (invoice == null)
                {
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
                }
                else
                {
                    Invoice u = ctx.CreateDetachedCopy<Invoice>(invoice);
                    return u;
                }
            }
        }

        // POST api/products
        public virtual HttpResponseMessage Post(Invoice invoice)
        {
            if (invoice == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    Invoice i = CntWebApiVerbs.PostInvoice(invoice, ctx);
                    Invoice idt = ctx.CreateDetachedCopy<Invoice>(i);
                    var response = Request.CreateResponse<Invoice>(HttpStatusCode.Created, idt);
                    response.Headers.Location = GetInvoiceLocation(idt.InvoiceId);
                    return response;
                }
            }
        }

        Uri GetInvoiceLocation(int invoiceId)
        {
            var controller = this.Request.GetRouteData().Values["controller"];
            return new Uri(this.Url.Link("DefaultApi", new { controller = controller, id = invoiceId }));
        }

        // PUT api/products/5
        public virtual HttpResponseMessage Put(int id, Invoice invoice)
        {
            if (invoice == null || id != invoice.InvoiceId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    // Does it exist?
                    Invoice i = CntWebApiVerbs.GetInvoice(id, ctx);
                    if (i == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    else
                    {
                        CntWebApiVerbs.PutInvoice(invoice, ctx);
                        return Request.CreateResponse(HttpStatusCode.NoContent);
                    }
                }
            }
        }

        // DELETE api/products/5
        public virtual HttpResponseMessage Delete(int id)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                Invoice u = CntWebApiVerbs.GetInvoice(id, ctx);
                if (u != null)
                {
                    CntWebApiVerbs.DeleteInvoice(u, ctx);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }
    }
}
