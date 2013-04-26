using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AriUMModel
{
    public static partial class CntWebApiSecurity
    {
        #region Criptography
        public static string GetHashCode(string password)
        {
            byte[] tmpSource = ASCIIEncoding.ASCII.GetBytes(password);
            byte[] tmpHash = new MD5CryptoServiceProvider().ComputeHash(tmpSource);

            return ByteArrayToString(tmpHash);
        }

        private static string ByteArrayToString(byte[] arrInput)
        {
            int i;
            StringBuilder sOutput = new StringBuilder(arrInput.Length);
            for (i = 0; i < arrInput.Length - 1; i++)
            {
                sOutput.Append(arrInput[i].ToString("X2"));
            }
            return sOutput.ToString();
        }
        #endregion Criptography

        public static WebApiTicket Login(string login, string password, int minutes, AriUMContext ctx)
        {
            WebApiTicket tk = null;
            // First verify if a user with this credentials exists
            User user = (from u in ctx.Users
                         where u.Login == login
                         select u).FirstOrDefault<User>();
            if (user != null)
            {
                // User exists. Does the password match?
                if (user.Password == GetHashCode(password))
                {
                    // Go to get the ticket
                    string code = GenerateTicket();
                    tk = new WebApiTicket()
                    {
                      Code = code,
                      Start = DateTime.Now,
                      User = user 
                    };
                    tk.End = tk.Start.AddMinutes(minutes);
                }
            }
            return tk;
        }
        public static bool CheckTicket(string code, AriUMContext ctx)
        {
            // Current date time
            DateTime curtime = DateTime.Now;
            // look for a ticket with this code and active
            WebApiTicket tk = (from t in ctx.WebApiTickets
                               where t.Code == code
                               && t.End > curtime
                               select t).FirstOrDefault<WebApiTicket>();
            if (tk != null)
                return true;
            else
                return false;
        }

        /// <summary>
        /// Generates a random string with the given length
        /// </summary>
        /// <param name="size">Size of the string</param>
        /// <param name="lowerCase">If true, generate lowercase string</param>
        /// <returns>Random string</returns>
        private static string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }
        private static int RandomNumber(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }
        public static string GenerateTicket()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(4, false));
            builder.Append(RandomNumber(1000, 9999));
            builder.Append(RandomString(2, false));
            return builder.ToString();
        }
    }
}
