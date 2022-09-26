package com.Memoir.Memoir.httpObjects.responseObjects;


public class ScrapbookResponse {
    Integer id;
    String name;

    public ScrapbookResponse() {}

    public ScrapbookResponse (Integer id, String name)
    {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

}