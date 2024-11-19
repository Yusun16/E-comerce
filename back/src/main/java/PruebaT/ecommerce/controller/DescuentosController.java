package PruebaT.ecommerce.controller;

import PruebaT.ecommerce.dto.DescuentosDTO;
import PruebaT.ecommerce.service.implement.DescuentosService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
@CrossOrigin(value = "http://localhost:4200")
public class DescuentosController {

    private static final Logger logger =
            LoggerFactory.getLogger(DescuentosController.class);

    @Autowired
    private DescuentosService descuentosService;

    @GetMapping("/descuento")
    public List<DescuentosDTO> listarDescuentos() {
        return descuentosService.listarDescuentos();
    };

    @PostMapping("/descuentos")
    public DescuentosDTO guardarDescuentos(@RequestBody DescuentosDTO descuentos) {
        var descuentoGuardado = this.descuentosService.guardarDescuento(descuentos);
        logger.info("Descuento guardadito" + descuentos);
        return descuentoGuardado;
    }
}
