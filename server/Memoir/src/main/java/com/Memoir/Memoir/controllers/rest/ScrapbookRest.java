package com.Memoir.Memoir.controllers.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Memoir.Memoir.domain.Scrapbook;
import com.Memoir.Memoir.domain.UserProfile;
import com.Memoir.Memoir.httpObjects.responseObjects.ScrapbookResponse;
import com.Memoir.Memoir.services.UserDetailsServiceImpl;

@RestController("/scrapbook-rest")
public class ScrapbookRest {
    

    @Autowired
    UserDetailsServiceImpl uServices;

    
    @GetMapping({"/get-scrapbook-page-names"})
    public Object getScrapbookPageNames()
    {
        //get username
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //get user profile
        UserProfile uProfile = uServices.getURepo().findByUsername(username);

        //get scrapbook page names in a list to return
        List<ScrapbookResponse> pageNames = new ArrayList<ScrapbookResponse>();
        uProfile.getScrapbooks().forEach( book -> {
            pageNames.add(new ScrapbookResponse(book.getId(),book.getName()));
        });
        
        return pageNames;
    }


    @GetMapping({"/get-scrapbook/{id}"})//IMPORTANT change Integer to String if problematic when testing
    public byte[] getScrapbook(@RequestParam Integer id) {
        //get username
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //get user profile
        UserProfile uProfile = uServices.getURepo().findByUsername(username);
        //get that particular Scrapbook
        Optional<Scrapbook> sbOptional = uProfile.getScrapbooks().stream().filter( book -> book.getId() == id.intValue()).findFirst();

        //if present - return the Scrapbook
        if (sbOptional.isPresent())
        {
            return sbOptional.get().getPdf();
        }
        //else return empty byte array (length 0)
        return new byte[0];
    }


}
