package PruebaT.ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@MappedSuperclass
public abstract class Auditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "estado", nullable = true)
    private Boolean estado;

    @Column(name = "registrado_por", nullable = true, length = 100)
    private String registradoPor;

    @Column(name = "eliminado_por", nullable = true, length = 100)
    private String eliminadoPor;

    @Column(name = "fecha_registro", nullable = true, updatable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaRegistro;

    @Column(name = "fecha_eliminacion", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaEliminacion;

    @PrePersist
    protected void onCreate() {
        this.fechaRegistro = new Date();
        this.estado = true; // Por defecto, el registro estará activo
    }
}
