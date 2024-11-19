package PruebaT.ecommerce.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Representa un producto en el sistema de ecommerce.
 * Contiene la información básica sobre un producto, incluyendo nombre,
 * descripción, imagen, stock y precio.
 *
 * @author Germna Garzon
 * @version 1.0
 */

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "productos")
public class Productos {

    public enum categoria {Electrónicos,Alimentos,
        Deportivos}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Integer id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "imagen")
    private String imagen;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "precio")
    private Double precio;

    @Column(name = "categoria")
    private categoria categoria;

}
