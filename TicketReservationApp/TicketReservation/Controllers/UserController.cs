using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketReservation.Models;
using TicketReservation.Services;
using TicketReservation.Services.Interfaces;

[Route("api/users")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserService userService;

    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> Get()
    {
        var users = await userService.GetUsersAsync();
        return Ok(users);
    }

[HttpGet("{id}")]
public async Task<ActionResult<User>> Get(string id)
{
    var user = await userService.GetUserByIdAsync(id);
    if (user == null)
    {
        return NotFound();
    }
    return Ok(user);
}

[HttpPost]
public async Task<ActionResult<User>> Create(User user)
{
    await userService.CreateUserAsync(user);
        ObjectId objid = ObjectId.GenerateNewId();
    return CreatedAtAction("Get", new { id = objid }, user);
}

[HttpPut("{id}")]
public async Task<IActionResult> Update(string id, User updatedUser)
{
    var existingUser = await userService.GetUserByIdAsync(id);
    if (existingUser == null)
    {
        return NotFound();
    }

    await userService.UpdateUserAsync(id, updatedUser);
    return NoContent();
}

[HttpDelete("{id}")]
public async Task<IActionResult> Delete(string id)
{
    var user = await userService.GetUserByIdAsync(id);
    if (user == null)
    {
        return NotFound();
    }

    await userService.DeleteUserAsync(id);
    return NoContent();
}
}
