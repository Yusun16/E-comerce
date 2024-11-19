package PruebaT.ecommerce.controller;

import PruebaT.ecommerce.dto.ProductosDTO;
import PruebaT.ecommerce.service.implement.ProductoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de productos.
 *
 * @author German Garzon
 * @version 1.0
 */

@RestController
@RequestMapping("api")
@CrossOrigin(value = "http://localhost:4200")
public class ProductoController {

    private static final Logger logger =
            LoggerFactory.getLogger(ProductoController.class);


    @Autowired
    private ProductoService productoService;

    /**
     * Lista todos los productos.
     *
     * @return una lista de objetos ProductosDTO.
     */
    @GetMapping("/producto")
    public List<ProductosDTO> listarProducto() {
        return this.productoService.listarProductos();
    }


    /**
     * Obtiene productos por nombre, ignorando mayúsculas y minúsculas.
     *
     * @param nombre el nombre del producto a buscar.
     * @return una ResponseEntity con una lista de objetos ProductosDTO que contienen el nombre buscado.
     */
    @GetMapping("/producto/{nombre}")
    public ResponseEntity<List<ProductosDTO>> obtenerProductoPorNombre(@PathVariable String nombre) {
        List<ProductosDTO> productosDTO = this.productoService.findByNombreContainingIgnoreCase(nombre);
        return ResponseEntity.ok(productosDTO);
    }


    /**
     * Agrega un nuevo producto.
     *
     * @param producto el objeto ProductosDTO a agregar.
     * @return el objeto ProductosDTO agregado.
     */
    @PostMapping("/producto")
    public ProductosDTO agregarProducto(@RequestBody ProductosDTO producto){
        var productoGuardado = this.productoService.guardarProducto(producto);
        logger.info("producto agregado" + producto);
        return productoGuardado;
    }

    /**
     * Actualiza un producto existente.
     *
     * @param producto el objeto ProductosDTO con la información actualizada.
     * @return una ResponseEntity con el objeto ProductosDTO actualizado.
     */
    @PutMapping("/producto")
    public ResponseEntity<ProductosDTO> actualizarProducto(@RequestBody ProductosDTO producto){
        ProductosDTO productoActualizado = productoService.actualizarProducto(producto);
        return ResponseEntity.ok(productoActualizado);
    }

    /**
     * Elimina un producto por su ID.
     *
     * @param id el ID del producto a eliminar.
     * @return una ResponseEntity sin contenido.
     */
    @DeleteMapping("/producto/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable int id){
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}
