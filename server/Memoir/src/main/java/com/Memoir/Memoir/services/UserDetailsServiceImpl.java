package com.Memoir.Memoir.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.Memoir.Memoir.repository.UserProfileRepository;
import com.Memoir.Memoir.domain.UserProfile;


public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UserProfileRepository userProfileRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("\n***************** LoadByUsername Called **************");
		System.out.println(username);
		// String password = null;
		UserProfile u =  null;
		u = userProfileRepo.findByUsername(username);
		
		boolean enabled = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNotLocked  = true;
		
		ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		String role = u.getRole();
		System.out.println("******** ROLE ******: "+ role);
		System.out.println(role+" created and granted authority.");
		
		authorities.add(new SimpleGrantedAuthority("ROLE_"+role));
		
		System.out.println("********* Username *********: " +u.getUsername());
		
		/*Authentication Manager will then try to make sure 
		 * that details submitted match these details that are being returned*/
		return new org.springframework.security.core.userdetails.User(
				u.getUsername(),
				u.getPassword(),
				enabled, 
				accountNonExpired,
				credentialsNonExpired, 
				accountNotLocked,
				authorities
				);
    }


	public UserProfileRepository getURepo()
	{
		return userProfileRepo;
	}
    
}
