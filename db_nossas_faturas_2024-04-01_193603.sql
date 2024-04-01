--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Debian 15.6-0+deb12u1)
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cartoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cartoes (
    id integer NOT NULL,
    nome character varying(25),
    pix character varying(35),
    dia_fechamento character(2),
    dia_vencimento character(2),
    limite_total numeric(10,2),
    limite_disponivel numeric(10,2),
    criado_em timestamp without time zone,
    atualizado_em timestamp without time zone
);


ALTER TABLE public.cartoes OWNER TO postgres;

--
-- Name: cartoes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cartoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cartoes_id_seq OWNER TO postgres;

--
-- Name: cartoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cartoes_id_seq OWNED BY public.cartoes.id;


--
-- Name: compras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compras (
    id integer NOT NULL,
    data_compra date,
    descricao character varying(50) NOT NULL,
    valor numeric(10,2) NOT NULL,
    parcelas integer NOT NULL,
    pessoa_id integer NOT NULL,
    status smallint,
    loja_id integer NOT NULL,
    cartao_id integer NOT NULL
);


ALTER TABLE public.compras OWNER TO postgres;

--
-- Name: COLUMN compras.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.compras.status IS '1 =  realizada,2 = estornada';


--
-- Name: compras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compras_id_seq OWNER TO postgres;

--
-- Name: compras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compras_id_seq OWNED BY public.compras.id;


--
-- Name: fatura_compra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fatura_compra (
    id integer NOT NULL,
    fatura_id integer NOT NULL,
    compra_id integer NOT NULL,
    parcela character(5) NOT NULL
);


ALTER TABLE public.fatura_compra OWNER TO postgres;

--
-- Name: fatura_compra_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fatura_compra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fatura_compra_id_seq OWNER TO postgres;

--
-- Name: fatura_compra_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fatura_compra_id_seq OWNED BY public.fatura_compra.id;


--
-- Name: faturas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faturas (
    id integer NOT NULL,
    data date,
    valor_total numeric(10,2),
    status character(2),
    cartao_id integer,
    valor_pago numeric(5,2)
);


ALTER TABLE public.faturas OWNER TO postgres;

--
-- Name: COLUMN faturas.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.faturas.status IS '1=> fechada, 2 => aberta, 3=>aguardando abertura,4=>paga';


--
-- Name: faturas_id _seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."faturas_id _seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."faturas_id _seq" OWNER TO postgres;

--
-- Name: faturas_id _seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."faturas_id _seq" OWNED BY public.faturas.id;


--
-- Name: lojas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lojas (
    id integer NOT NULL,
    nome character varying(30) NOT NULL
);


ALTER TABLE public.lojas OWNER TO postgres;

--
-- Name: loja_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loja_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.loja_id_seq OWNER TO postgres;

--
-- Name: loja_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loja_id_seq OWNED BY public.lojas.id;


--
-- Name: pessoas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pessoas (
    id integer NOT NULL,
    nome character varying(50) NOT NULL,
    criado_em timestamp without time zone DEFAULT now(),
    atualizado_em timestamp without time zone DEFAULT now()
);


ALTER TABLE public.pessoas OWNER TO postgres;

--
-- Name: pessoas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pessoas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pessoas_id_seq OWNER TO postgres;

--
-- Name: pessoas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pessoas_id_seq OWNED BY public.pessoas.id;


--
-- Name: cartoes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartoes ALTER COLUMN id SET DEFAULT nextval('public.cartoes_id_seq'::regclass);


--
-- Name: compras id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras ALTER COLUMN id SET DEFAULT nextval('public.compras_id_seq'::regclass);


--
-- Name: fatura_compra id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fatura_compra ALTER COLUMN id SET DEFAULT nextval('public.fatura_compra_id_seq'::regclass);


--
-- Name: faturas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faturas ALTER COLUMN id SET DEFAULT nextval('public."faturas_id _seq"'::regclass);


--
-- Name: lojas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lojas ALTER COLUMN id SET DEFAULT nextval('public.loja_id_seq'::regclass);


--
-- Name: pessoas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoas ALTER COLUMN id SET DEFAULT nextval('public.pessoas_id_seq'::regclass);


--
-- Name: cartoes cartoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartoes
    ADD CONSTRAINT cartoes_pkey PRIMARY KEY (id);


--
-- Name: compras compras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_pkey PRIMARY KEY (id);


--
-- Name: fatura_compra fatura_compra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fatura_compra
    ADD CONSTRAINT fatura_compra_pkey PRIMARY KEY (id);


--
-- Name: faturas faturas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faturas
    ADD CONSTRAINT faturas_pkey PRIMARY KEY (id);


--
-- Name: lojas loja_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lojas
    ADD CONSTRAINT loja_pkey PRIMARY KEY (id);


--
-- Name: pessoas pessoas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoas
    ADD CONSTRAINT pessoas_pkey PRIMARY KEY (id);


--
-- Name: fki_c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_c ON public.compras USING btree (cartao_id);


--
-- Name: fki_fk_compra_loja; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_compra_loja ON public.compras USING btree (loja_id);


--
-- Name: fki_fk_compra_pessoas; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_compra_pessoas ON public.compras USING btree (pessoa_id);


--
-- Name: fki_fk_fatura_cartao; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_fatura_cartao ON public.faturas USING btree (cartao_id);


--
-- Name: fki_fk_fatura_compra_compra; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_fatura_compra_compra ON public.fatura_compra USING btree (compra_id);


--
-- Name: fki_fk_fatura_compra_fatura; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_fatura_compra_fatura ON public.fatura_compra USING btree (fatura_id);


--
-- Name: compras fk_compra_loja; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT fk_compra_loja FOREIGN KEY (loja_id) REFERENCES public.lojas(id) NOT VALID;


--
-- Name: compras fk_compra_pessoas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT fk_compra_pessoas FOREIGN KEY (pessoa_id) REFERENCES public.pessoas(id) NOT VALID;


--
-- Name: compras fk_compras_cartao; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT fk_compras_cartao FOREIGN KEY (cartao_id) REFERENCES public.cartoes(id) NOT VALID;


--
-- Name: faturas fk_fatura_cartao; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faturas
    ADD CONSTRAINT fk_fatura_cartao FOREIGN KEY (cartao_id) REFERENCES public.cartoes(id) NOT VALID;


--
-- Name: fatura_compra fk_fatura_compra_compra; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fatura_compra
    ADD CONSTRAINT fk_fatura_compra_compra FOREIGN KEY (compra_id) REFERENCES public.compras(id) NOT VALID;


--
-- Name: fatura_compra fk_fatura_compra_fatura; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fatura_compra
    ADD CONSTRAINT fk_fatura_compra_fatura FOREIGN KEY (fatura_id) REFERENCES public.faturas(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

