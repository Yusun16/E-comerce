package PruebaT.ecommerce.security.controller;


import PruebaT.ecommerce.security.dto.*;
import PruebaT.ecommerce.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Controlador para manejar solicitudes relacionadas con la autenticación.
 * Proporciona endpoints para el inicio de sesión y el registro de usuarios.
 *
 * @author German Garzon
 * @version 1.0
 */
@RestController
@RequestMapping("api/security")
@RequiredArgsConstructor
@CrossOrigin(value = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;

    /**
     * Endpoint para el inicio de sesión de usuarios.
     *
     * @param request la solicitud de inicio de sesión que contiene las credenciales del usuario
     * @return una entidad de respuesta que contiene la respuesta de autenticación
     */
    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * Endpoint para el registro de usuarios.
     *
     * @param request la solicitud de registro que contiene los detalles del usuario
     * @return una entidad de respuesta que contiene la respuesta de autenticación
     */
    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping(value = "consultar-usuarios")
    public List<UserDto> consultUsers(){
        return authService.consultUsers();
    }
}
