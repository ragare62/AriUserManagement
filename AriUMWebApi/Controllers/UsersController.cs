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
    public class UsersController : ApiController
    {
        // GET api/users
        public IEnumerable<User> Get()
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                IEnumerable<User> user = CntWebApiVerbs.GetUsers(ctx);
                FetchStrategy fs = new FetchStrategy();
                fs.LoadWith<User>(x => x.UserGroup);
                IEnumerable<User> uS = ctx.CreateDetachedCopy<IEnumerable<User>>(user, fs);
                return uS;
            }
        }


        // GET api/users/5
        public virtual User Get(int id)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                User user = CntWebApiVerbs.GetUser(id, ctx);
                if (user == null)
                {
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
                }
                else
                {
                    FetchStrategy fs = new FetchStrategy();
                    fs.LoadWith<User>(x => x.UserGroup);
                    User u = ctx.CreateDetachedCopy<User>(user, fs);
                    return u;
                }
            }
        }

        // POST api/users
        public virtual HttpResponseMessage Post(User user)
        {
            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    if (user.UserGroup != null)
                    {
                        int id2 = user.UserGroup.UserGroupId;
                        user.UserGroup = CntWebApiVerbs.GetUserGroup(id2, ctx);
                    }
                    User u = CntWebApiVerbs.PostUser(user, ctx);
                    FetchStrategy fs = new FetchStrategy();
                    fs.LoadWith<User>(x => x.UserGroup);
                    User ud = ctx.CreateDetachedCopy<User>(u, fs);
                    var response = Request.CreateResponse<User>(HttpStatusCode.Created, ud);
                    response.Headers.Location = GetUserGroupLocation(ud.UserId);
                    return response;
                }
            }
        }

        Uri GetUserGroupLocation(int userGroupId)
        {
            var controller = this.Request.GetRouteData().Values["controller"];
            return new Uri(this.Url.Link("DefaultApi", new { controller = controller, id = userGroupId }));
        }

        // PUT api/users/5
        public virtual HttpResponseMessage Put(int id, User user)
        {
            if (user == null || id != user.UserId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
                {
                    // Does it exist?
                    User u = CntWebApiVerbs.GetUser(id, ctx);
                    if (u == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    else
                    {
                        // In order to avoid chage the UserGroup name accidentally
                        if (user.UserGroup != null)
                        {
                            int id2 = user.UserGroup.UserGroupId;
                            UserGroup ug = CntWebApiVerbs.GetUserGroup(id2, ctx);
                            if (ug.Name != user.UserGroup.Name)
                            {
                                user.UserGroup.Name = ug.Name;
                            }
                        }
                        CntWebApiVerbs.PutUser(user, ctx);
                        return Request.CreateResponse(HttpStatusCode.NoContent);
                    }
                }
            }
        }

        // DELETE api/users/5
        public virtual HttpResponseMessage Delete(int id)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                User u = CntWebApiVerbs.GetUser(id, ctx);
                if (u != null)
                {
                    CntWebApiVerbs.DeleteUser(u, ctx);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }
    }
}
