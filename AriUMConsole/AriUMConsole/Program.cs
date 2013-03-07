using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AriUMConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("-- AriUserManager CONSOLE -- Welcome");
            string cmd = "";
                while (cmd != "exit")
                {
                    Console.Write("COMMAND: ");
                    cmd = Console.ReadLine();
                    switch (cmd)
                    {
                        case "exit":
                            Console.WriteLine("Goodbye...");
                            break;
                        case "create":
                            Console.WriteLine("Creating registers...");
                            CntConsole.CreateDefaultRegisters();
                            break;
                        default:
                            Console.WriteLine("What?");
                            break;
                    }
                }

        }
    }
}
