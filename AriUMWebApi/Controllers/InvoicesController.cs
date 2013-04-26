using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AriUMModel;
using Telerik.OpenAccess.FetchOptimization;
using Telerik.OpenAccess;

namespace AriUMWebApi.Controllers
{
    public class InvoicesController : ApiController
    {
        // GET api/products
        public IEnumerable<Invoice> Get()
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                IEnumerable<Invoice> invoices = CntWebApiVerbs.GetInvoices(ctx);
                FetchStrategy fs = new FetchStrategy();
                fs.LoadWith<Invoice>(x => x.Customer);
                IEnumerable<Invoice> cS = ctx.CreateDetachedCopy<IEnumerable<Invoice>>(invoices, fs);
                return cS;
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
                    FetchStrategy fs = new FetchStrategy();
                    fs.LoadWith<Invoice>(x => x.Customer);
                    Invoice c = ctx.CreateDetachedCopy<Invoice>(invoice, fs);
                    return c;
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
                    if (invoice.Customer != null)
                    {
                        //
                        Customer customer = (from c in ctx.Customers
                                             where c.CustomerId == invoice.Customer.CustomerId
                                             select c).FirstOrDefault<Customer>();
                        if (customer != null)
                        {
                            invoice.Customer = customer;
                        }
                        else
                        {
                        }
                    }
                    // Calculate invoice number
                    int maxInvoiceNumber = (from inv in ctx.Invoices
                                            where inv.Year == invoice.Year
                                            select inv.InvoiceNumber).Max();
                    invoice.InvoiceNumber = maxInvoiceNumber + 1;
                    Invoice i = CntWebApiVerbs.PostInvoice(invoice, ctx);
                    FetchStrategy fs = new FetchStrategy();
                    fs.LoadWith<Invoice>(x => x.Customer);
                    Invoice idt = ctx.CreateDetachedCopy<Invoice>(i,fs);
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
                        i = CntWebApiVerbs.PutInvoice(invoice, ctx);
                        FetchStrategy fs = new FetchStrategy();
                        fs.LoadWith<Invoice>(x => x.Customer);
                        Invoice idt = ctx.CreateDetachedCopy<Invoice>(i, fs);
                        return Request.CreateResponse<Invoice>(HttpStatusCode.OK, idt);
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
