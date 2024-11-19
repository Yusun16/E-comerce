package PruebaT.ecommerce.repository;

import PruebaT.ecommerce.model.Descuentos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DescuentosRepository  extends JpaRepository<Descuentos, Integer> {

    List<Descuentos> findByFechaFinBeforeAndEstadoTrue(LocalDate fecha);
}
