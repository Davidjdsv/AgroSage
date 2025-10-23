-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-10-2025 a las 02:29:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agrosage`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agricultores`
--

CREATE TABLE `agricultores` (
  `id_agricultor` int(11) NOT NULL,
  `nombre_completo` varchar(150) NOT NULL,
  `cedula` varchar(12) NOT NULL,
  `telefono_movil` varchar(25) NOT NULL,
  `direccion` varchar(120) NOT NULL,
  `barrio_vereda` varchar(80) NOT NULL,
  `departamento` varchar(80) NOT NULL,
  `municipio` varchar(30) NOT NULL,
  `contrasena` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alertas`
--

CREATE TABLE `alertas` (
  `id_alerta` varchar(36) NOT NULL,
  `id_parcela` int(11) NOT NULL,
  `riesgo` varchar(30) NOT NULL,
  `severidad` varchar(10) NOT NULL,
  `fecha_alerta` date NOT NULL,
  `mensaje` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calendario_agricola`
--

CREATE TABLE `calendario_agricola` (
  `id_calendario` varchar(36) NOT NULL,
  `id_cultivo` int(11) NOT NULL,
  `zona_altitud` varchar(10) DEFAULT NULL,
  `siembra_mes_ini` tinyint(4) DEFAULT NULL,
  `siembra_mes_fin` tinyint(4) DEFAULT NULL,
  `duracion_meses` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canales_comercializacion`
--

CREATE TABLE `canales_comercializacion` (
  `id_canal` int(11) NOT NULL,
  `nombre_canal` varchar(60) NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `costos_insumo_parcela`
--

CREATE TABLE `costos_insumo_parcela` (
  `id_costo` varchar(36) NOT NULL,
  `id_parcela` int(11) NOT NULL,
  `id_insumo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario_cop` int(11) NOT NULL,
  `subtotal_cop` int(11) NOT NULL,
  `iva_cop` int(11) NOT NULL,
  `total_cop` int(11) NOT NULL,
  `proveedor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cultivos_catalogo`
--

CREATE TABLE `cultivos_catalogo` (
  `id_cultivo` int(11) NOT NULL,
  `nombre_cultivo` varchar(60) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `siembra_mes_ini` tinyint(4) DEFAULT NULL,
  `siembra_mes_fin` tinyint(4) DEFAULT NULL,
  `cosecha_meses` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos_catalogo`
--

CREATE TABLE `insumos_catalogo` (
  `id_insumo` int(11) NOT NULL,
  `nombre_insumo` varchar(100) NOT NULL,
  `categoria` varchar(40) NOT NULL,
  `precio_base_cop` int(11) NOT NULL,
  `iva_pct` tinyint(4) DEFAULT 19
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parcelas`
--

CREATE TABLE `parcelas` (
  `id_parcela` int(11) NOT NULL,
  `id_agricultor` int(11) NOT NULL,
  `id_suelo` int(11) NOT NULL,
  `nombre_parcela` varchar(80) NOT NULL,
  `ubicacion_gps` varchar(50) DEFAULT NULL,
  `departamento` varchar(80) NOT NULL,
  `ciudad` varchar(80) NOT NULL,
  `altitud_msnm` int(11) DEFAULT NULL,
  `ph_suelo` decimal(4,2) DEFAULT NULL,
  `fuente_agua` bit(1) DEFAULT NULL,
  `sistema_riego` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes_siembra`
--

CREATE TABLE `planes_siembra` (
  `id_plan` varchar(36) NOT NULL,
  `id_parcela` int(11) NOT NULL,
  `id_cultivo` int(11) NOT NULL,
  `fecha_siembra` date NOT NULL,
  `fecha_cosecha_estimada` date NOT NULL,
  `mano_obra_dia_cop` int(11) NOT NULL,
  `canal_comercial_preferido` int(11) NOT NULL,
  `objetivo` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios_mercado`
--

CREATE TABLE `precios_mercado` (
  `id_precio` varchar(36) NOT NULL,
  `id_cultivo` int(11) NOT NULL,
  `departamento` varchar(80) NOT NULL,
  `ciudad` varchar(80) NOT NULL,
  `fecha` date NOT NULL,
  `unidad_medida` varchar(20) NOT NULL,
  `precio_cop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recomendaciones`
--

CREATE TABLE `recomendaciones` (
  `id_recomendacion` varchar(36) NOT NULL,
  `id_parcela` int(11) NOT NULL,
  `id_cultivo_sugerido` int(11) NOT NULL,
  `id_cultivo_alternativo` int(11) NOT NULL,
  `justificacion` varchar(250) NOT NULL,
  `ahorro_estimado_pct` decimal(4,2) NOT NULL,
  `incremento_ingreso_pct` decimal(4,2) NOT NULL,
  `riesgo_climatico_clave` varchar(40) DEFAULT NULL,
  `recomendado_por_modelo` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros_clima`
--

CREATE TABLE `registros_clima` (
  `id_registro` varchar(36) NOT NULL,
  `id_parcela` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `tmin_c` decimal(4,1) DEFAULT NULL,
  `tmax_c` decimal(4,1) DEFAULT NULL,
  `tmed_c` decimal(4,1) DEFAULT NULL,
  `lluvia_mm` decimal(6,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suelos_catalogo`
--

CREATE TABLE `suelos_catalogo` (
  `id_suelo` int(11) NOT NULL,
  `tipo_suelo` varchar(40) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `ph_referencia` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_plan`
--

CREATE TABLE `tareas_plan` (
  `id_tarea` varchar(36) NOT NULL,
  `id_plan` varchar(36) NOT NULL,
  `etapa` varchar(60) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `responsable` varchar(40) NOT NULL,
  `completada` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agricultores`
--
ALTER TABLE `agricultores`
  ADD PRIMARY KEY (`id_agricultor`),
  ADD UNIQUE KEY `cedula` (`cedula`);
-- NOTA: Se ha eliminado el índice `idx_agricultores_ciudad` según tu solicitud.

--
-- Indices de la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD PRIMARY KEY (`id_alerta`),
  ADD KEY `idx_alertas_parcela_fecha` (`id_parcela`,`fecha_alerta`);

--
-- Indices de la tabla `calendario_agricola`
--
ALTER TABLE `calendario_agricola`
  ADD PRIMARY KEY (`id_calendario`),
  ADD KEY `idx_calendario_cultivo` (`id_cultivo`,`zona_altitud`);

--
-- Indices de la tabla `canales_comercializacion`
--
ALTER TABLE `canales_comercializacion`
  ADD PRIMARY KEY (`id_canal`),
  ADD UNIQUE KEY `nombre_canal` (`nombre_canal`);

--
-- Indices de la tabla `costos_insumo_parcela`
--
ALTER TABLE `costos_insumo_parcela`
  ADD PRIMARY KEY (`id_costo`),
  ADD KEY `fk_costos_insumo` (`id_insumo`),
  ADD KEY `idx_costos_parcela_fecha` (`id_parcela`,`fecha`);

--
-- Indices de la tabla `cultivos_catalogo`
--
ALTER TABLE `cultivos_catalogo`
  ADD PRIMARY KEY (`id_cultivo`),
  ADD UNIQUE KEY `nombre_cultivo` (`nombre_cultivo`);

--
-- Indices de la tabla `insumos_catalogo`
--
ALTER TABLE `insumos_catalogo`
  ADD PRIMARY KEY (`id_insumo`),
  ADD UNIQUE KEY `nombre_insumo` (`nombre_insumo`);

--
-- Indices de la tabla `parcelas`
--
ALTER TABLE `parcelas`
  ADD PRIMARY KEY (`id_parcela`),
  ADD KEY `fk_parcelas_suelo` (`id_suelo`),
  ADD KEY `idx_parcelas_agricultor` (`id_agricultor`),
  ADD KEY `idx_parcelas_ciudad` (`ciudad`);

--
-- Indices de la tabla `planes_siembra`
--
ALTER TABLE `planes_siembra`
  ADD PRIMARY KEY (`id_plan`),
  ADD KEY `fk_plan_cultivo` (`id_cultivo`),
  ADD KEY `fk_plan_canal` (`canal_comercial_preferido`),
  ADD KEY `idx_planes_parcela` (`id_parcela`);

--
-- Indices de la tabla `precios_mercado`
--
ALTER TABLE `precios_mercado`
  ADD PRIMARY KEY (`id_precio`),
  ADD KEY `idx_precios_cultivo_fecha` (`id_cultivo`,`fecha`),
  ADD KEY `idx_precios_ciudad` (`ciudad`);

--
-- Indices de la tabla `recomendaciones`
--
ALTER TABLE `recomendaciones`
  ADD PRIMARY KEY (`id_recomendacion`),
  ADD KEY `fk_rec_cultivo_sug` (`id_cultivo_sugerido`),
  ADD KEY `fk_rec_cultivo_alt` (`id_cultivo_alternativo`),
  ADD KEY `idx_rec_parcela` (`id_parcela`);

--
-- Indices de la tabla `registros_clima`
--
ALTER TABLE `registros_clima`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `idx_clima_parcela_fecha` (`id_parcela`,`fecha`);

--
-- Indices de la tabla `suelos_catalogo`
--
ALTER TABLE `suelos_catalogo`
  ADD PRIMARY KEY (`id_suelo`),
  ADD UNIQUE KEY `tipo_suelo` (`tipo_suelo`);

--
-- Indices de la tabla `tareas_plan`
--
ALTER TABLE `tareas_plan`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `idx_tareas_plan` (`id_plan`,`etapa`);

--
-- AUTO_INCREMENT para las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agricultores`
--
ALTER TABLE `agricultores`
  MODIFY `id_agricultor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `canales_comercializacion`
--
ALTER TABLE `canales_comercializacion`
  MODIFY `id_canal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cultivos_catalogo`
--
ALTER TABLE `cultivos_catalogo`
  MODIFY `id_cultivo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `insumos_catalogo`
--
ALTER TABLE `insumos_catalogo`
  MODIFY `id_insumo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `parcelas`
--
ALTER TABLE `parcelas`
  MODIFY `id_parcela` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `suelos_catalogo`
--
ALTER TABLE `suelos_catalogo`
  MODIFY `id_suelo` int(11) NOT NULL AUTO_INCREMENT;


--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD CONSTRAINT `fk_alerta_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcelas` (`id_parcela`);

--
-- Filtros para la tabla `calendario_agricola`
--
ALTER TABLE `calendario_agricola`
  ADD CONSTRAINT `fk_calendario_cultivo` FOREIGN KEY (`id_cultivo`) REFERENCES `cultivos_catalogo` (`id_cultivo`);

--
-- Filtros para la tabla `costos_insumo_parcela`
--
ALTER TABLE `costos_insumo_parcela`
  ADD CONSTRAINT `fk_costos_insumo` FOREIGN KEY (`id_insumo`) REFERENCES `insumos_catalogo` (`id_insumo`),
  ADD CONSTRAINT `fk_costos_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcelas` (`id_parcela`);

--
-- Filtros para la tabla `parcelas`
--
ALTER TABLE `parcelas`
  ADD CONSTRAINT `fk_parcelas_agric` FOREIGN KEY (`id_agricultor`) REFERENCES `agricultores` (`id_agricultor`),
  ADD CONSTRAINT `fk_parcelas_suelo` FOREIGN KEY (`id_suelo`) REFERENCES `suelos_catalogo` (`id_suelo`);

--
-- Filtros para la tabla `planes_siembra`
--
ALTER TABLE `planes_siembra`
  ADD CONSTRAINT `fk_plan_canal` FOREIGN KEY (`canal_comercial_preferido`) REFERENCES `canales_comercializacion` (`id_canal`),
  ADD CONSTRAINT `fk_plan_cultivo` FOREIGN KEY (`id_cultivo`) REFERENCES `cultivos_catalogo` (`id_cultivo`),
  ADD CONSTRAINT `fk_plan_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcelas` (`id_parcela`);

--
-- Filtros para la tabla `precios_mercado`
--
ALTER TABLE `precios_mercado`
  ADD CONSTRAINT `fk_precio_cultivo` FOREIGN KEY (`id_cultivo`) REFERENCES `cultivos_catalogo` (`id_cultivo`);

--
-- Filtros para la tabla `recomendaciones`
--
ALTER TABLE `recomendaciones`
  ADD CONSTRAINT `fk_rec_cultivo_alt` FOREIGN KEY (`id_cultivo_alternativo`) REFERENCES `cultivos_catalogo` (`id_cultivo`),
  ADD CONSTRAINT `fk_rec_cultivo_sug` FOREIGN KEY (`id_cultivo_sugerido`) REFERENCES `cultivos_catalogo` (`id_cultivo`),
  ADD CONSTRAINT `fk_rec_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcelas` (`id_parcela`);

--
-- Filtros para la tabla `registros_clima`
--
ALTER TABLE `registros_clima`
  ADD CONSTRAINT `fk_clima_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcelas` (`id_parcela`);

--
-- Filtros para la tabla `tareas_plan`
--
ALTER TABLE `tareas_plan`
  ADD CONSTRAINT `fk_tarea_plan` FOREIGN KEY (`id_plan`) REFERENCES `planes_siembra` (`id_plan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;