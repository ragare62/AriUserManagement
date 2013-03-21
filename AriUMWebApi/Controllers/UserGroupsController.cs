using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using AriUMModel;
using Telerik.OpenAccess;
using Telerik.OpenAccess.FetchOptimization;

namespace AriUMWebApi.Controllers
{
    public class UserGroupsController : ApiController
    {
        // GET api/usergroups
        public IEnumerable<UserGroup> Get()
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                IEnumerable<UserGroup> userGroups = CntWebApiVerbs.GetUserGroups(ctx);
                FetchStrategy fs = new FetchStrategy();
                IEnumerable<UserGroup> uGs = ctx.CreateDetachedCopy<IEnumerable<UserGroup>>(userGroups, fs);
                return uGs;
            }
        }

        // GET api/usergroups/5
        public virtual UserGroup Get(int id)
        {

            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                UserGroup userGroup = CntWebApiVerbs.GetUserGroup(id, ctx);
                if (userGroup == null)
                {
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
                }
                else
                {
                    FetchStrategy fs = new FetchStrategy();
                    UserGroup uG = ctx.CreateDetachedCopy<UserGroup>(userGroup, fs);
                    return uG;
                }
            }
        }

        // POST api/usergroups
        public virtual HttpResponseMessage Post(UserGroup userGroup)
        {
            if (userGroup == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    UserGroup uG = CntWebApiVerbs.PostUserGroup(userGroup, ctx);
                    FetchStrategy fs = new FetchStrategy();
                    UserGroup uGd = ctx.CreateDetachedCopy<UserGroup>(uG, fs);
                    var response = Request.CreateResponse<UserGroup>(HttpStatusCode.Created, uGd);
                    response.Headers.Location = GetUserGroupLocation(uGd.UserGroupId);
                    return response;
                }
            }
        }

        Uri GetUserGroupLocation(int userGroupId)
        {
            var controller = this.Request.GetRouteData().Values["controller"];
            return new Uri(this.Url.Link("DefaultApi", new { controller = controller, id = userGroupId }));
        }

        // PUT api/usergroups/5
        public virtual HttpResponseMessage Put(int id, UserGroup userGroup)
        {
            if (userGroup == null || id != userGroup.UserGroupId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    // Does it exist?
                    UserGroup ug = CntWebApiVerbs.GetUserGroup(id, ctx);
                    if (ug == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    else
                    {
                        CntWebApiVerbs.PutUserGroup(userGroup, ctx);
                        return Request.CreateResponse(HttpStatusCode.NoContent);
                    }
                }
            }
        }

        // DELETE api/usergroups/5
        public virtual HttpResponseMessage Delete(int id)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                UserGroup uG = CntWebApiVerbs.GetUserGroup(id, ctx);
                if (uG != null)
                {
                    CntWebApiVerbs.DeleteUserGroup(uG, ctx);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }

    }
}
