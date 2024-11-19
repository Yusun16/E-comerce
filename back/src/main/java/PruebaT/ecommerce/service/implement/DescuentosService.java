package PruebaT.ecommerce.service.implement;

import PruebaT.ecommerce.dto.DescuentosDTO;
import PruebaT.ecommerce.model.Descuentos;
import PruebaT.ecommerce.repository.DescuentosRepository;
import PruebaT.ecommerce.service.IService.IDescuentosService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DescuentosService implements IDescuentosService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private DescuentosRepository descuentosRepository;

    @Override
    public List<DescuentosDTO> listarDescuentos() {
        var descuentos = this.descuentosRepository.findAll();
        return descuentos.stream()
                .map(descuent -> this.modelMapper.map(descuent, DescuentosDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Descuentos guardarDescuento(Descuentos descuentos) {

        return descuentosRepository.save(modelMapper.map(descuentos, Descuentos.class));
    }

    @Override
    public List<Descuentos> obtenerDescuentosActivos() {
        LocalDate fechaActual = LocalDate.now();
        return descuentosRepository.findByFechaFinAfterAndEstadoTrue(fechaActual);
    }

    //Cronometro en un periodo de tiempo(30 minutes)
    @Scheduled(cron = "*/10 * * * * ?")
    public void verificarDescuentosExpirados() {
        // Obtener la fecha en la que se activo
        LocalDate fechaActual = LocalDate.now();

        // Buscar todos los descuentos en la fechaFin es anterior a la fecha actual y están activos
        List<Descuentos> descuentosExpirados = descuentosRepository.findByFechaFinBeforeAndEstadoTrue(fechaActual);

        // Actualizar el estado de estos descuentos a falso
        for (Descuentos descuento : descuentosExpirados) {
            descuento.setEstado(false);
            descuentosRepository.save(descuento);
        }

        System.out.println("Descuentos expirados actualizados.");
    }
}
