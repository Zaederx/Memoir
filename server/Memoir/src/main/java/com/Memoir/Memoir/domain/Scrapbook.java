package com.Memoir.Memoir.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
@Entity
public class Scrapbook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Lob
    @Column(name = "image", columnDefinition = "BLOB")
    private byte[] pdf;

    public Scrapbook(){}


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


    public byte[] getPdf() {
        return this.pdf;
    }

    public void setPdf(byte[] pdf) {
        this.pdf = pdf;
    }

}
