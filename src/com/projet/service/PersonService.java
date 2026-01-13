package com.projet.service;

import java.util.List;
import com.projet.entities.Person;

public interface PersonService {
    List<Person> getAllPersons();
    Person getPerson(long id);
    boolean addPerson(Person p);
    boolean updatePerson(Person p);
    boolean deletePerson(long id);
}
