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
    public class ProductsController : ApiController
    {
        // GET api/products
        public IEnumerable<Product> Get()
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                IEnumerable<Product> product = CntWebApiVerbs.GetProducts(ctx);
                IEnumerable<Product> cS = ctx.CreateDetachedCopy<IEnumerable<Product>>(product);
                return cS;
            }
        }


        // GET api/products/5
        public virtual Product Get(int id)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                Product product = CntWebApiVerbs.GetProduct(id, ctx);
                if (product == null)
                {
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
                }
                else
                {
                    Product u = ctx.CreateDetachedCopy<Product>(product);
                    return u;
                }
            }
        }

        // POST api/products
        public virtual HttpResponseMessage Post(Product product)
        {
            if (product == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    Product c = CntWebApiVerbs.PostProduct(product, ctx);
                    Product cd = ctx.CreateDetachedCopy<Product>(c);
                    var response = Request.CreateResponse<Product>(HttpStatusCode.Created, cd);
                    response.Headers.Location = GetProductGroupLocation(cd.ProductId);
                    return response;
                }
            }
        }

        Uri GetProductGroupLocation(int productGroupId)
        {
            var controller = this.Request.GetRouteData().Values["controller"];
            return new Uri(this.Url.Link("DefaultApi", new { controller = controller, id = productGroupId }));
        }

        // PUT api/products/5
        public virtual HttpResponseMessage Put(int id, Product product)
        {
            if (product == null || id != product.ProductId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    // Does it exist?
                    Product u = CntWebApiVerbs.GetProduct(id, ctx);
                    if (u == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    else
                    {
                        CntWebApiVerbs.PutProduct(product, ctx);
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
                Product u = CntWebApiVerbs.GetProduct(id, ctx);
                if (u != null)
                {
                    CntWebApiVerbs.DeleteProduct(u, ctx);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }
    }
}
