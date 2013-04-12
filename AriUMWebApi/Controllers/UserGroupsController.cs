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
        /// <summary>
        /// Get all user groups from the server
        /// </summary>
        /// <returns>A list of all user groups</returns>
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

        /// <summary>
        /// Get all user groups ordered alphabetically
        /// </summary>
        /// <param name="order">Indicates what order you want , so far it orders by name only</param>
        /// <returns></returns>
        public IEnumerable<UserGroup> GetOrdered(string order)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                IEnumerable<UserGroup> userGroups = (from ug in ctx.UserGroups
                                                         orderby ug.Name
                                                         select ug).ToList<UserGroup>();
                FetchStrategy fs = new FetchStrategy();
                IEnumerable<UserGroup> uGs = ctx.CreateDetachedCopy<IEnumerable<UserGroup>>(userGroups, fs);
                return uGs;
            }
        }


        /// <summary>
        /// Get an individual user group
        /// </summary>
        /// <param name="id">User groups' id you want</param>
        /// <returns>Use group object (XML/JSON)</returns>
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

        /// <summary>
        /// Gets the user group with a given name
        /// </summary>
        /// <param name="name">The name of the object</param>
        /// <returns>User group object</returns>
        public virtual UserGroup GetByName(string name)
        {
            using (AriUMContext ctx = new AriUMContext("AriUMDBConnection"))
            {
                UserGroup userGroup = (from ug in ctx.UserGroups
                                       where ug.Name == name
                                       select ug).FirstOrDefault<UserGroup>();
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

        /// <summary>
        /// Creates a new user group
        /// </summary>
        /// <param name="userGroup">The user group that yo want to create</param>
        /// <returns>Url related to the new object</returns>
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

        /// <summary>
        /// Updates the given user group
        /// </summary>
        /// <param name="id">The id of the user group to be updated</param>
        /// <param name="userGroup">User group with the modifications you want</param>
        /// <returns></returns>
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

        /// <summary>
        /// Deletes the user group with a given id
        /// </summary>
        /// <param name="id">Id of the user group to be deleted</param>
        /// <returns></returns>
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
