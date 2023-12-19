-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/12/2023 às 19:03
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `universidade`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `alunos`
--

CREATE TABLE `alunos` (
  `id_aluno` int(10) UNSIGNED NOT NULL,
  `nome` varchar(50) NOT NULL,
  `sobrenome` varchar(50) NOT NULL,
  `dataNascimento` date NOT NULL,
  `id_turma_FK` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `alunos`
--

INSERT INTO `alunos` (`id_aluno`, `nome`, `sobrenome`, `dataNascimento`, `id_turma_FK`) VALUES
(15, 'ALLAN ', 'FURLANI', '2002-08-23', 16),
(16, 'Henrique', 'Galvão', '2000-02-20', 16),
(17, 'João', 'Paulo', '2001-02-20', 16);

-- --------------------------------------------------------

--
-- Estrutura para tabela `disciplinas`
--

CREATE TABLE `disciplinas` (
  `id_disciplina` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `ementa` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `disciplinas`
--

INSERT INTO `disciplinas` (`id_disciplina`, `nome`, `ementa`) VALUES
(13, 'UX Design', 'Nilsen, User Experience etc.'),
(14, 'Front End', 'React'),
(15, 'Banco de Dados', 'MySQL'),
(16, 'Engenharia de Software', 'MVC'),
(17, 'Lógica de Programação.', 'Condicionais, Loops etc.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `id_func` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `sobrenome` varchar(50) DEFAULT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  `login` varchar(25) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `funcionarios`
--

INSERT INTO `funcionarios` (`id_func`, `nome`, `sobrenome`, `cargo`, `login`, `senha`) VALUES
(25, 'Bruno', 'Clemente', 'prof', 'bruno', '$2b$11$GRseB81LKU57yMW7CxZgXOb5EfigWJnoF55d1Ax0OFhxt5q/Xghou'),
(26, 'Anonymus ', 'Anonymus s2', 'admin', 'admin', '$2b$10$1lyEVVBJa9yfrFVc/rRZLe5QQYxK5N8M7GULbuzCIJkCmdpZthS9m'),
(27, 'Maycon', 'Guedes', 'prof', 'maycon', '$2b$11$7tU7qeJuCLB6/L9lSMT9geTv8/qhEEuodXCUhznUk5t1DBxnGp3oW'),
(34, '123', '123', 'prof', '123', '$2b$11$rvCBz6l6/kdiEhYL/pBiw./lAa3ORzWA34bV06kGRKawnTI2nxHSu');

-- --------------------------------------------------------

--
-- Estrutura para tabela `turmas`
--

CREATE TABLE `turmas` (
  `id_turma` int(10) UNSIGNED NOT NULL,
  `id_disciplina_FK` int(11) DEFAULT NULL,
  `ano` int(11) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `id_func_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `turmas`
--

INSERT INTO `turmas` (`id_turma`, `id_disciplina_FK`, `ano`, `nome`, `id_func_FK`) VALUES
(16, 17, 2023, 'TSI', 25),
(17, 15, 2023, 'TADS', 27);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `alunos`
--
ALTER TABLE `alunos`
  ADD PRIMARY KEY (`id_aluno`),
  ADD KEY `id_turma_FK` (`id_turma_FK`);

--
-- Índices de tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  ADD PRIMARY KEY (`id_disciplina`);

--
-- Índices de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`id_func`);

--
-- Índices de tabela `turmas`
--
ALTER TABLE `turmas`
  ADD PRIMARY KEY (`id_turma`),
  ADD KEY `id_disciplina_FK` (`id_disciplina_FK`),
  ADD KEY `id_func_FK` (`id_func_FK`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `alunos`
--
ALTER TABLE `alunos`
  MODIFY `id_aluno` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  MODIFY `id_disciplina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `id_func` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de tabela `turmas`
--
ALTER TABLE `turmas`
  MODIFY `id_turma` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `alunos`
--
ALTER TABLE `alunos`
  ADD CONSTRAINT `alunos_ibfk_1` FOREIGN KEY (`id_turma_FK`) REFERENCES `turmas` (`id_turma`);

--
-- Restrições para tabelas `turmas`
--
ALTER TABLE `turmas`
  ADD CONSTRAINT `turmas_ibfk_1` FOREIGN KEY (`id_disciplina_FK`) REFERENCES `disciplinas` (`id_disciplina`),
  ADD CONSTRAINT `turmas_ibfk_2` FOREIGN KEY (`id_func_FK`) REFERENCES `funcionarios` (`id_func`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
