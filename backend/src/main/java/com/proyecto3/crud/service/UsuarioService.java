package com.proyecto3.crud.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyecto3.crud.config.DataInitializer;
import com.proyecto3.crud.dto.RegisterRequest;
import com.proyecto3.crud.dto.UsuarioResponse;
import com.proyecto3.crud.entity.Rol;
import com.proyecto3.crud.entity.Usuario;
import com.proyecto3.crud.exception.BusinessException;
import com.proyecto3.crud.exception.ResourceNotFoundException;
import com.proyecto3.crud.repository.RolRepository;
import com.proyecto3.crud.repository.UsuarioRepository;

/**
 * Registro y consulta de usuarios.
 */
@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          RolRepository rolRepository,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listar() {
        return usuarioRepository.findAll().stream()
                .map(UsuarioResponse::from)
                .toList();
    }

    public Usuario registrar(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("Ya existe un usuario con el email: " + request.getEmail());
        }

        Rol rolUser = rolRepository.findByNombre(DataInitializer.ROL_USER)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe el rol " + DataInitializer.ROL_USER));

        Usuario usuario = new Usuario(request.getEmail(),
                passwordEncoder.encode(request.getPassword()), rolUser);
        return usuarioRepository.save(usuario);
    }
}
