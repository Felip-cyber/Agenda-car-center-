## Componentes por Módulo

### 📁 auth/
- **LoginClass.jsx**: Autenticación de usuarios implementada como componente de clase
- **Register.jsx**: Registro de nuevos usuarios
- **RecuperarPassword.jsx**: Funcionalidad para recuperación de contraseñas

### 📁 servicios/
- **ServicioClass.jsx**: Componente de clase para gestión de servicios
- **ListaServicios.jsx**: Catálogo de servicios disponibles
- **DetalleServicio.jsx**: Vista detallada de cada servicio
- **ReservaServicio.jsx**: Proceso de reserva de servicio

### 📁 citas/
- **CitaFuncional.jsx**: Programación de citas (implementado como componente funcional)
- **FormularioCitaFunc.jsx**: Formulario para agendar y editar citas
- **CalendarioCitas.jsx**: Visualización de calendario con disponibilidad
- **RecordatorioCitas.jsx**: Sistema de notificaciones para citas

### 📁 dashboard/
- **Dashboard.jsx**: Panel principal con resumen de información
- **EstadisticasServicio.jsx**: Métricas de servicios realizados
- **GraficosRendimiento.jsx**: Visualización gráfica de datos
- **IndicadoresNegocio.jsx**: KPIs y métricas de rendimiento

### 📁 checklist/
- **CheckList.jsx**: Componente principal para listas de verificación
- **ItemCheckList.jsx**: Ítem individual dentro de un checklist
- **ProgresoCheckList.jsx**: Barra de progreso para seguimiento
- **PlantillasCheckList.jsx**: Plantillas predefinidas de checklists

### 📁 shared/
- **NavigationBar.jsx**: Barra de navegación principal
- **ErrorBoundary.jsx**: Componente para manejo centralizado de errores
- **Loading.jsx**: Componente de carga reutilizable
- **Footer.jsx**: Pie de página común
- **WhatsAppButton.jsx**: Botón flotante de contacto WhatsApp

### 📁 inventario/
- **Inventario.jsx**: Gestión general de insumos y repuestos
- **MovimientosStock.jsx**: Registro de entradas y salidas de inventario
- **AlertasInventario.jsx**: Notificaciones de stock bajo
- **ProveedoresView.jsx**: Gestión de proveedores

### 📁 facturacion/
- **Factura.jsx**: Generación de facturas electrónicas
- **HistorialPagos.jsx**: Registro histórico de pagos
- **MetodosPago.jsx**: Opciones de pago disponibles
- **ResumenFinanciero.jsx**: Resumen de transacciones

### 📁 reportes/
- **ReporteMensual.jsx**: Generación de informes mensuales
- **ExportarDatos.jsx**: Funcionalidad para exportar información
- **ReporteRendimiento.jsx**: Análisis de rendimiento operativo
- **VisualizacionDatos.jsx**: Gráficos y visualizaciones

## Flujo de Datos Principal

1. El usuario se autentica mediante los componentes de `auth/`
2. Navega al catálogo de `servicios/` para seleccionar el servicio deseado
3. Programa una cita usando los componentes de `citas/`
4. Los administradores pueden visualizar información en el `dashboard/`
5. Durante el servicio, se utiliza el `checklist/` para garantizar calidad
6. Se gestiona el `inventario/` de insumos utilizados
7. Se genera la `facturacion/` correspondiente al servicio
8. Se pueden extraer `reportes/` para análisis de negocio

## Notas de Desarrollo

- Usamos componentes funcionales con Hooks para nuevos desarrollos
- Los componentes de clase existentes se mantendrán por ahora
- Seguimos los principios de diseño atómico para componentes compartidos
