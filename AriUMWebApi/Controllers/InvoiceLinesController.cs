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
    public class InvoiceLinesController : ApiController
    {
        // GET api/invoiceLines
        public IEnumerable<InvoiceLine> Get()
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                IEnumerable<InvoiceLine> invoiceLine = CntWebApiVerbs.GetInvoiceLines(ctx);
                FetchStrategy fs = new FetchStrategy();
                fs.LoadWith<InvoiceLine>(x => x.Product, x => x.Invoice);
                IEnumerable<InvoiceLine> iS = ctx.CreateDetachedCopy<IEnumerable<InvoiceLine>>(invoiceLine, fs);
                return iS;
            }
        }

        public IEnumerable<InvoiceLine> GetLinesFromInvoice(int InvoiceId)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                IEnumerable<InvoiceLine> invoiceLine = (from il in ctx.InvoiceLines
                                                        where il.Invoice.InvoiceId == InvoiceId
                                                        select il).ToList<InvoiceLine>();
                FetchStrategy fs = new FetchStrategy();
                fs.LoadWith<InvoiceLine>(x => x.Product, x => x.Invoice);
                IEnumerable<InvoiceLine> iS = ctx.CreateDetachedCopy<IEnumerable<InvoiceLine>>(invoiceLine, fs);
                return iS;
            }
        }


        // GET api/invoiceLines/5
        public virtual InvoiceLine Get(int id)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                InvoiceLine invoiceLine = CntWebApiVerbs.GetInvoiceLine(id, ctx);
                if (invoiceLine == null)
                {
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
                }
                else
                {
                    FetchStrategy fs = new FetchStrategy();
                    fs.LoadWith<InvoiceLine>(x => x.Product, x => x.Invoice);
                    InvoiceLine il = ctx.CreateDetachedCopy<InvoiceLine>(invoiceLine, fs);
                    return il;
                }
            }
        }

        // POST api/invoiceLines
        public virtual HttpResponseMessage Post(InvoiceLine invoiceLine)
        {
            if (invoiceLine == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                if (invoiceLine.Product == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No se puede crear una línea sin producto");
                }
                if (invoiceLine.Invoice == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No se puede crear una línea de factura sin información de su cabecera");
                }
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    InvoiceLine i = CntWebApiVerbs.PostInvoiceLine(invoiceLine, ctx);
                    InvoiceLine idt = ctx.CreateDetachedCopy<InvoiceLine>(i);
                    var response = Request.CreateResponse<InvoiceLine>(HttpStatusCode.Created, idt);
                    response.Headers.Location = GetInvoiceLineLocation(idt.InvoiceLineId);
                    return response;
                }
            }
        }

        Uri GetInvoiceLineLocation(int invoiceLineId)
        {
            var controller = this.Request.GetRouteData().Values["controller"];
            return new Uri(this.Url.Link("DefaultApi", new { controller = controller, id = invoiceLineId }));
        }

        // PUT api/invoiceLines/5
        public virtual HttpResponseMessage Put(int id, InvoiceLine invoiceLine)
        {
            if (invoiceLine == null || id != invoiceLine.InvoiceLineId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    // Does it exist?
                    InvoiceLine i = CntWebApiVerbs.GetInvoiceLine(id, ctx);
                    if (i == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    else
                    {
                        CntWebApiVerbs.PutInvoiceLine(invoiceLine, ctx);
                        return Request.CreateResponse(HttpStatusCode.NoContent);
                    }
                }
            }
        }

        // DELETE api/invoiceLines/5
        public virtual HttpResponseMessage Delete(int id)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                InvoiceLine il = CntWebApiVerbs.GetInvoiceLine(id, ctx);
                if (il != null)
                {
                    CntWebApiVerbs.DeleteInvoiceLine(il, ctx);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }
    }
}
