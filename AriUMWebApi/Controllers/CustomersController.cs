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
    public class CustomersController : ApiController
    {
        // GET api/customers
        public IEnumerable<Customer> Get()
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                IEnumerable<Customer> customer = CntWebApiVerbs.GetCustomers(ctx);
                IEnumerable<Customer> cS = ctx.CreateDetachedCopy<IEnumerable<Customer>>(customer);
                return cS;
            }
        }


        // GET api/customers/5
        public virtual Customer Get(int id)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                Customer customer = CntWebApiVerbs.GetCustomer(id, ctx);
                if (customer == null)
                {
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
                }
                else
                {
                    Customer u = ctx.CreateDetachedCopy<Customer>(customer);
                    return u;
                }
            }
        }

        // POST api/customers
        public virtual HttpResponseMessage Post(Customer customer)
        {
            if (customer == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    Customer c = CntWebApiVerbs.PostCustomer(customer, ctx);
                    Customer cd = ctx.CreateDetachedCopy<Customer>(c);
                    var response = Request.CreateResponse<Customer>(HttpStatusCode.Created, cd);
                    response.Headers.Location = GetCustomerGroupLocation(cd.CustomerId);
                    return response;
                }
            }
        }

        Uri GetCustomerGroupLocation(int customerGroupId)
        {
            var controller = this.Request.GetRouteData().Values["controller"];
            return new Uri(this.Url.Link("DefaultApi", new { controller = controller, id = customerGroupId }));
        }

        // PUT api/customers/5
        public virtual HttpResponseMessage Put(int id, Customer customer)
        {
            if (customer == null || id != customer.CustomerId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    // Does it exist?
                    Customer u = CntWebApiVerbs.GetCustomer(id, ctx);
                    if (u == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    else
                    {
                        CntWebApiVerbs.PutCustomer(customer, ctx);
                        return Request.CreateResponse(HttpStatusCode.NoContent);
                    }
                }
            }
        }

        // DELETE api/customers/5
        public virtual HttpResponseMessage Delete(int id)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                Customer u = CntWebApiVerbs.GetCustomer(id, ctx);
                if (u != null)
                {
                    CntWebApiVerbs.DeleteCustomer(u, ctx);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }
    }
}
