using Microsoft.AspNetCore.Mvc;

namespace powerbi_netcore_react_demo.Controllers;

[ApiController]
[Route("[controller]")]
public class MyController : ControllerBase
{
    [HttpGet]
    public string Get()
    {
        return "Hello World";
    }
}
