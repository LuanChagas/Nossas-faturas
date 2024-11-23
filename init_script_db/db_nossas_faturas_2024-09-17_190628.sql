--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8 (Debian 15.8-0+deb12u1)
-- Dumped by pg_dump version 15.8 (Debian 15.8-0+deb12u1)

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


ALTER TABLE public.cartoes_id_seq OWNER TO postgres;

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


ALTER TABLE public.compras_id_seq OWNER TO postgres;

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


ALTER TABLE public.fatura_compra_id_seq OWNER TO postgres;

--
-- Name: fatura_compra_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fatura_compra_id_seq OWNED BY public.fatura_compra.id;


--
-- Name: faturas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faturas (
    id integer NOT NULL,
    data date NOT NULL,
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


ALTER TABLE public."faturas_id _seq" OWNER TO postgres;

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


ALTER TABLE public.loja_id_seq OWNER TO postgres;

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


ALTER TABLE public.pessoas_id_seq OWNER TO postgres;

--
-- Name: pessoas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pessoas_id_seq OWNED BY public.pessoas.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    user_name character varying(25),
    password character varying(255)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


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
-- Data for Name: cartoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cartoes (id, nome, pix, dia_fechamento, dia_vencimento, limite_total, limite_disponivel, criado_em, atualizado_em) FROM stdin;
152	Inter	15454301795	10	20	6000.00	-3791.34	\N	\N
153	Meliuz	1234	8 	15	2343.44	-53473.23	\N	\N
\.


--
-- Data for Name: compras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compras (id, data_compra, descricao, valor, parcelas, pessoa_id, status, loja_id, cartao_id) FROM stdin;
71	2024-05-01	Roupa	100.00	2	103	1	138	153
72	2024-05-01	tv	50.00	1	102	1	137	153
73	2024-05-01	Teclado	120.00	2	103	1	138	153
74	2024-05-01	tes	50.00	2	103	1	137	153
75	2024-05-01	roupa	200.00	2	102	1	137	153
76	2024-05-01	wer	123.44	2	103	1	137	153
77	2024-05-01	3eds	1234.32	2	102	1	137	153
78	2024-05-01	3eds	1234.32	2	102	1	137	153
79	2024-05-01	Ledite	123.45	2	102	1	137	153
80	2024-05-01	carne	500.00	2	103	1	138	153
81	2024-05-01	compra nova	1000.00	2	103	1	137	153
82	2024-05-01	asd	1232.34	2	103	1	137	152
83	2024-05-01	sdffds	33243.24	2	102	1	138	153
84	2024-05-01	com error	1234.34	2	102	1	137	153
85	2024-05-01	sdfsdf	123.54	2	102	1	137	153
86	2024-05-01	sadas	123.34	2	102	1	137	153
87	2024-05-01	234	12354.23	11	103	1	138	153
\.


--
-- Data for Name: fatura_compra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fatura_compra (id, fatura_id, compra_id, parcela) FROM stdin;
132	349	71	1/2  
133	350	71	2/2  
134	349	72	1/1  
135	349	73	1/2  
136	349	74	1/2  
137	349	75	1/2  
138	349	76	1/2  
140	349	79	1/2  
142	349	81	1/2  
143	348	82	1/2  
144	357	82	2/2  
145	349	83	1/2  
146	349	84	1/2  
147	349	85	1/2  
148	350	85	2/2  
149	349	86	1/2  
150	350	86	2/2  
151	349	87	1/11 
152	350	87	2/11 
153	360	87	3/11 
154	361	87	4/11 
155	362	87	5/11 
156	363	87	6/11 
157	364	87	7/11 
158	365	87	8/11 
159	366	87	9/11 
160	367	87	10/11
161	368	87	11/11
\.


--
-- Data for Name: faturas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faturas (id, data, valor_total, status, cartao_id, valor_pago) FROM stdin;
360	2024-07-08	1123.11	3 	153	0.00
361	2024-08-08	1123.11	3 	153	0.00
362	2024-09-08	1123.11	3 	153	0.00
363	2024-10-08	1123.11	3 	153	0.00
364	2024-11-08	1123.11	3 	153	0.00
365	2024-12-08	1123.11	3 	153	0.00
366	2025-01-08	1123.11	3 	153	0.00
367	2025-02-08	1123.11	3 	153	0.00
368	2025-03-08	1123.11	3 	153	0.00
348	2024-05-10	616.17	1 	152	0.00
349	2024-05-08	20257.11	1 	153	0.00
357	2024-06-10	616.17	2 	152	0.00
350	2024-06-08	1295.11	2 	153	0.00
\.


--
-- Data for Name: lojas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lojas (id, nome) FROM stdin;
138	Amazon
137	Superbom
\.


--
-- Data for Name: pessoas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pessoas (id, nome, criado_em, atualizado_em) FROM stdin;
102	Luan	2024-05-01 11:54:14.194144	2024-05-01 11:54:14.194144
103	Karoline	2024-05-01 11:54:22.999845	2024-05-01 11:54:22.999845
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, user_name, password) FROM stdin;
1	luanch	$2b$10$9AhdzbLDF224XncwNvOZL.vEhiJWD6KB1OQBl6jgHakVuUrypKqo2
2	karolinech	\N
\.


--
-- Name: cartoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cartoes_id_seq', 153, true);


--
-- Name: compras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compras_id_seq', 87, true);


--
-- Name: fatura_compra_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fatura_compra_id_seq', 161, true);


--
-- Name: faturas_id _seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."faturas_id _seq"', 368, true);


--
-- Name: loja_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loja_id_seq', 138, true);


--
-- Name: pessoas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pessoas_id_seq', 103, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);


--
-- Name: faturas cartao_data_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faturas
    ADD CONSTRAINT cartao_data_unique UNIQUE (cartao_id, data);


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
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


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
-- Name: fatura_compra fatura_compra_fatura_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fatura_compra
    ADD CONSTRAINT fatura_compra_fatura_fk FOREIGN KEY (fatura_id) REFERENCES public.faturas(id);


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
-- PostgreSQL database dump complete
--

