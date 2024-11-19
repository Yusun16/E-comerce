package PruebaT.ecommerce.service.IService;

import PruebaT.ecommerce.dto.DescuentosDTO;

import java.util.List;

public interface IDescuentosService {

    public List<DescuentosDTO> listarDescuentos();
    public DescuentosDTO guardarDescuento(DescuentosDTO descuentos);
}
