package com.proyecto3.crud.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto3.crud.dto.AuthResponse;
import com.proyecto3.crud.dto.LoginRequest;
import com.proyecto3.crud.dto.RegisterRequest;
import com.proyecto3.crud.entity.Usuario;
import com.proyecto3.crud.security.JwtService;
import com.proyecto3.crud.service.UsuarioService;

import jakarta.validation.Valid;

/**
 * Autenticación de usuarios: login y registro. El registro siempre crea
 * usuarios con rol USER.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UsuarioService usuarioService;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager,
                          UserDetailsService userDetailsService,
                          UsuarioService usuarioService,
                          JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);
        String rol = userDetails.getAuthorities().iterator().next().getAuthority();

        return ResponseEntity.ok(new AuthResponse(token, userDetails.getUsername(), rol));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        Usuario usuario = usuarioService.registrar(request);

        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AuthResponse(token, usuario.getEmail(), usuario.getRol().getNombre()));
    }
}
