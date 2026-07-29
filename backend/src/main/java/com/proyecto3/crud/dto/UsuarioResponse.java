package com.proyecto3.crud.dto;

import com.proyecto3.crud.entity.Usuario;

/**
 * Vista pública de un usuario. Nunca expone la contraseña.
 */
public class UsuarioResponse {

    private Long id;
    private String email;
    private String rol;

    public UsuarioResponse(Long id, String email, String rol) {
        this.id = id;
        this.email = email;
        this.rol = rol;
    }

    public static UsuarioResponse from(Usuario usuario) {
        return new UsuarioResponse(usuario.getId(), usuario.getEmail(),
                usuario.getRol().getNombre());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
