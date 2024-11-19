package PruebaT.ecommerce.repository;

import PruebaT.ecommerce.model.Productos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para gestionar las operaciones CRUD de la entidad {@link Productos}.
 * Proporciona métodos para realizar consultas personalizadas sobre la tabla de productos.
 *
 * Extiende de {@link JpaRepository} que provee métodos básicos como guardar, eliminar y buscar.
 *
 * @author German Garzon
 * @version 1.0
 */
@Repository
public interface ProductosRepository extends JpaRepository<Productos, Integer> {

    /**
     * Busca productos cuyo nombre contenga la cadena especificada, ignorando mayúsculas y minúsculas.
     *
     * @param nombre la cadena que debe estar contenida en el nombre del producto.
     * @return una lista de productos que coinciden con el criterio de búsqueda.
     */
    @Query("SELECT p FROM Productos p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Productos> findByNombreContainingIgnoreCase(@Param("nombre") String nombre);

}