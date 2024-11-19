package PruebaT.ecommerce.security.service;


import PruebaT.ecommerce.repository.OrdenesRepository;
import PruebaT.ecommerce.security.dto.AuthResponse;
import PruebaT.ecommerce.security.dto.LoginRequest;
import PruebaT.ecommerce.security.dto.RegisterRequest;
import PruebaT.ecommerce.security.model.User;
import PruebaT.ecommerce.security.repository.UserRepository;
import PruebaT.ecommerce.service.IService.IOrdenService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


/**
 * Servicio para la autenticación y registro de usuarios.
 *
 * Utiliza {@link UserRepository} para acceder a la informacion y ajsutes del repositorio.
 * Utiliza {@link JwtService} para acceder a los servicios de JWT.
 * Utiliza {@link PasswordEncoder} para acceder a los servicios de encriptacion de comparacion de contraseña.
 * Utiliza {@link AuthenticationManager} para acceder a los servicios de manejo de sesion de spring security.
*
 * @author German Garzon
 * @version 1.0
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    /**
     * Autentica a un usuario y genera un token JWT.
     *
     * @param request el objeto LoginRequest que contiene las credenciales del usuario.
     * @return un AuthResponse con el token JWT.
     */
    public AuthResponse login(LoginRequest request) {
        // Autenticar al usuario
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        // Buscar el usuario en la base de datos
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("No se encontró el usuario"));

        // Generar el token JWT
        String token = jwtService.getToken(user);

        // Retornar la respuesta con el token y el rol
        return AuthResponse.builder()
                .token(token)
                .role(user.getRole()) // Usar el campo `role` directamente
                .build();
    }




    /**
     * Registra a un nuevo usuario y genera un token JWT.
     *
     * @param request el objeto RegisterRequest que contiene los datos del nuevo usuario.
     * @return un AuthResponse con el token JWT.
     */
    public AuthResponse register(RegisterRequest request){
        User user=User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .role(request.getRole())
                .build();

        userRepository.save(user);
        return AuthResponse.builder().token(jwtService.getToken(user)).
                role(user.getRole()).build();
    }
}
