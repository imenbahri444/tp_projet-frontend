package com.projet.router;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.projet.entities.Person;
import com.projet.service.PersonServiceImpl;

@Path("/")
public class RestRouter {

    PersonServiceImpl p_s = new PersonServiceImpl();

    @GET
    @Path("/ping")
    @Produces(MediaType.TEXT_PLAIN)
    public String ping() {
        return "OK";
    }

    // LIST
    @GET
    @Path("/persons")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Person> getAllPersons() {
        return p_s.getAllPersons();
    }

    // GET BY ID
    @GET
    @Path("/persons/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPerson(@PathParam("id") long id) {
        Person p = p_s.getPerson(id);
        if (p == null) return Response.status(Response.Status.NOT_FOUND).build();
        return Response.ok(p).build();
    }

    // ADD
    @POST
    @Path("/persons")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addPerson(Person person) {
        boolean ok = p_s.addPerson(person);
        if (!ok) return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        return Response.status(Response.Status.CREATED).build();
    }

    // UPDATE
    @PUT
    @Path("/persons/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePerson(@PathParam("id") long id, Person person) {
        // force id from URL (safer)
        person.setId(id);

        boolean ok = p_s.updatePerson(person);
        if (!ok) return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        return Response.ok().build();
    }

    // DELETE
    @DELETE
    @Path("/persons/{id}")
    public Response deletePerson(@PathParam("id") long id) {
        boolean ok = p_s.deletePerson(id);
        if (!ok) return Response.status(Response.Status.NOT_FOUND).build();
        return Response.ok().build();
    }
}
