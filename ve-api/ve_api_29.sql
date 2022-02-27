--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14
-- Dumped by pg_dump version 10.14

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

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: enum_assets_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_assets_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.enum_assets_status OWNER TO postgres;

--
-- Name: enum_assets_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_assets_type AS ENUM (
    'BASIC',
    'ARTICLE',
    'MEDIA',
    'CONTENT',
    'URL'
);


ALTER TYPE public.enum_assets_type OWNER TO postgres;

--
-- Name: enum_boothResources_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_boothResources_type" AS ENUM (
    'MEDIA',
    'CONTENT',
    'URL'
);


ALTER TYPE public."enum_boothResources_type" OWNER TO postgres;

--
-- Name: enum_booths_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_booths_type AS ENUM (
    'STANDARD',
    'INFORMATION',
    'ORGANIZER'
);


ALTER TYPE public.enum_booths_type OWNER TO postgres;

--
-- Name: enum_chatMessages_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_chatMessages_type" AS ENUM (
    'MESSAGE',
    'IMAGE',
    'VIDEO',
    'FILE'
);


ALTER TYPE public."enum_chatMessages_type" OWNER TO postgres;

--
-- Name: enum_halls_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_halls_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.enum_halls_status OWNER TO postgres;

--
-- Name: enum_landings_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_landings_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.enum_landings_status OWNER TO postgres;

--
-- Name: enum_lobbies_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_lobbies_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.enum_lobbies_status OWNER TO postgres;

--
-- Name: enum_organizers_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_organizers_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.enum_organizers_status OWNER TO postgres;

--
-- Name: enum_permissions_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_permissions_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.enum_permissions_status OWNER TO postgres;

--
-- Name: enum_resourceHubs_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_resourceHubs_status" AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public."enum_resourceHubs_status" OWNER TO postgres;

--
-- Name: enum_roles_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_roles_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.enum_roles_status OWNER TO postgres;

--
-- Name: enum_routes_method; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_routes_method AS ENUM (
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH'
);


ALTER TYPE public.enum_routes_method OWNER TO postgres;

--
-- Name: enum_routes_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_routes_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.enum_routes_status OWNER TO postgres;

--
-- Name: enum_sceneAssets_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_sceneAssets_status" AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public."enum_sceneAssets_status" OWNER TO postgres;

--
-- Name: enum_sceneAssets_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_sceneAssets_type" AS ENUM (
    'MEDIA',
    'CONTENT',
    'URL'
);


ALTER TYPE public."enum_sceneAssets_type" OWNER TO postgres;

--
-- Name: enum_sceneTemplates_sceneType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_sceneTemplates_sceneType" AS ENUM (
    'BOOTH',
    'LOBBY',
    'HALL',
    'INFORMATION_BOOTH'
);


ALTER TYPE public."enum_sceneTemplates_sceneType" OWNER TO postgres;

--
-- Name: enum_sceneTemplates_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_sceneTemplates_status" AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public."enum_sceneTemplates_status" OWNER TO postgres;

--
-- Name: enum_stages_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_stages_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.enum_stages_status OWNER TO postgres;

--
-- Name: enum_stages_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_stages_type AS ENUM (
    'ZOOM',
    'IMAGE',
    'VIDEO',
    'YOUTUBE'
);


ALTER TYPE public.enum_stages_type OWNER TO postgres;

--
-- Name: enum_users_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.enum_users_status OWNER TO postgres;

--
-- Name: enum_visits_device; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_visits_device AS ENUM (
    'MOBILE',
    'BROWSER'
);


ALTER TYPE public.enum_visits_device OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: assets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assets (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    status public.enum_assets_status DEFAULT 'ACTIVE'::public.enum_assets_status,
    type public.enum_assets_type DEFAULT 'MEDIA'::public.enum_assets_type,
    value text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "boothId" integer
);


ALTER TABLE public.assets OWNER TO postgres;

--
-- Name: assets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assets_id_seq OWNER TO postgres;

--
-- Name: assets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assets_id_seq OWNED BY public.assets.id;


--
-- Name: boothResources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."boothResources" (
    id integer NOT NULL,
    type public."enum_boothResources_type" DEFAULT 'MEDIA'::public."enum_boothResources_type",
    value text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "boothId" integer
);


ALTER TABLE public."boothResources" OWNER TO postgres;

--
-- Name: boothResources_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."boothResources_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."boothResources_id_seq" OWNER TO postgres;

--
-- Name: boothResources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."boothResources_id_seq" OWNED BY public."boothResources".id;


--
-- Name: booths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booths (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "aboutUs" text,
    attributes json,
    "calendlyUrl" character varying(255),
    type public.enum_booths_type DEFAULT 'STANDARD'::public.enum_booths_type,
    avatar character varying(255),
    "meetingUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sceneTemplateId" integer,
    "websiteUrl" character varying
);


ALTER TABLE public.booths OWNER TO postgres;

--
-- Name: booths_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.booths_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.booths_id_seq OWNER TO postgres;

--
-- Name: booths_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.booths_id_seq OWNED BY public.booths.id;


--
-- Name: chatConversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."chatConversations" (
    id integer NOT NULL,
    "notificationBooth" boolean DEFAULT false,
    "notificationUser" boolean DEFAULT false,
    "notificationGuest" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "boothId" integer,
    "userId" integer
);


ALTER TABLE public."chatConversations" OWNER TO postgres;

--
-- Name: chatConversations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."chatConversations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."chatConversations_id_seq" OWNER TO postgres;

--
-- Name: chatConversations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."chatConversations_id_seq" OWNED BY public."chatConversations".id;


--
-- Name: chatMessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."chatMessages" (
    id integer NOT NULL,
    type public."enum_chatMessages_type" DEFAULT 'MESSAGE'::public."enum_chatMessages_type",
    message character varying(255),
    readed json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "chatConversationId" integer,
    "userId" integer,
    src character varying(255),
    size integer
);


ALTER TABLE public."chatMessages" OWNER TO postgres;

--
-- Name: chatMessages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."chatMessages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."chatMessages_id_seq" OWNER TO postgres;

--
-- Name: chatMessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."chatMessages_id_seq" OWNED BY public."chatMessages".id;


--
-- Name: collectors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collectors (
    id integer NOT NULL,
    collector json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "boothId" integer,
    "hallId" integer,
    "stageId" integer,
    "userId" integer
);


ALTER TABLE public.collectors OWNER TO postgres;

--
-- Name: collectors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.collectors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collectors_id_seq OWNER TO postgres;

--
-- Name: collectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.collectors_id_seq OWNED BY public.collectors.id;


--
-- Name: halls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.halls (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    status public.enum_halls_status DEFAULT 'ACTIVE'::public.enum_halls_status,
    avatar character varying(255),
    attributes json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sceneTemplateId" integer,
    "lobbyId" integer
);


ALTER TABLE public.halls OWNER TO postgres;

--
-- Name: halls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.halls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.halls_id_seq OWNER TO postgres;

--
-- Name: halls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.halls_id_seq OWNED BY public.halls.id;


--
-- Name: landings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.landings (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    status public.enum_landings_status DEFAULT 'ACTIVE'::public.enum_landings_status,
    description text,
    background character varying(255),
    button character varying(255),
    "isAllowLogin" boolean DEFAULT true,
    "disableLoginMessage" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.landings OWNER TO postgres;

--
-- Name: landings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.landings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.landings_id_seq OWNER TO postgres;

--
-- Name: landings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.landings_id_seq OWNED BY public.landings.id;


--
-- Name: lobbies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lobbies (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    status public.enum_lobbies_status DEFAULT 'ACTIVE'::public.enum_lobbies_status,
    "welcomeMsg" text,
    data json,
    attributes json,
    "isWelcomeMsgVisble" boolean DEFAULT false,
    "welcomeMsgTitle" character varying(255),
    logo character varying(255),
    favicon character varying(255),
    "siteTitle" character varying(255),
    "infoBoothButton" character varying(255),
    "organizerBoothButton" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sceneTemplateId" integer
);


ALTER TABLE public.lobbies OWNER TO postgres;

--
-- Name: lobbies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lobbies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lobbies_id_seq OWNER TO postgres;

--
-- Name: lobbies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lobbies_id_seq OWNED BY public.lobbies.id;


--
-- Name: organizers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizers (
    id integer NOT NULL,
    name character varying(255),
    status public.enum_organizers_status DEFAULT 'ACTIVE'::public.enum_organizers_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "lobbyId" integer,
    "boothId" integer,
    "landingId" integer,
    "infoDeskId" integer
);


ALTER TABLE public.organizers OWNER TO postgres;

--
-- Name: organizers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organizers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organizers_id_seq OWNER TO postgres;

--
-- Name: organizers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organizers_id_seq OWNED BY public.organizers.id;


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id integer NOT NULL,
    code character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    status public.enum_permissions_status DEFAULT 'ACTIVE'::public.enum_permissions_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permissions_id_seq OWNER TO postgres;

--
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- Name: resourceHubs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."resourceHubs" (
    id integer NOT NULL,
    status public."enum_resourceHubs_status" DEFAULT 'ACTIVE'::public."enum_resourceHubs_status",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "boothId" integer,
    "assetId" integer
);


ALTER TABLE public."resourceHubs" OWNER TO postgres;

--
-- Name: resourceHubs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."resourceHubs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."resourceHubs_id_seq" OWNER TO postgres;

--
-- Name: resourceHubs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."resourceHubs_id_seq" OWNED BY public."resourceHubs".id;


--
-- Name: rolePermissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."rolePermissions" (
    id integer NOT NULL,
    "permissionId" integer NOT NULL,
    "roleId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."rolePermissions" OWNER TO postgres;

--
-- Name: rolePermissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."rolePermissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."rolePermissions_id_seq" OWNER TO postgres;

--
-- Name: rolePermissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."rolePermissions_id_seq" OWNED BY public."rolePermissions".id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    "roleAcp" boolean DEFAULT false,
    name character varying(255) NOT NULL,
    status public.enum_roles_status DEFAULT 'ACTIVE'::public.enum_roles_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.routes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    method public.enum_routes_method NOT NULL,
    "regexUri" character varying(255) NOT NULL,
    "permissionId" integer NOT NULL,
    status public.enum_routes_status DEFAULT 'ACTIVE'::public.enum_routes_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.routes OWNER TO postgres;

--
-- Name: routes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.routes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.routes_id_seq OWNER TO postgres;

--
-- Name: routes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.routes_id_seq OWNED BY public.routes.id;


--
-- Name: sceneAssets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."sceneAssets" (
    id integer NOT NULL,
    key character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "hallId" integer,
    "assetId" integer,
    "lobbyId" integer,
    "boothId" integer,
    "stageId" integer
);


ALTER TABLE public."sceneAssets" OWNER TO postgres;

--
-- Name: sceneAssets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."sceneAssets_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public."sceneAssets_id_seq" OWNER TO postgres;

--
-- Name: sceneAssets_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."sceneAssets_id_seq1"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."sceneAssets_id_seq1" OWNER TO postgres;

--
-- Name: sceneAssets_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."sceneAssets_id_seq1" OWNED BY public."sceneAssets".id;


--
-- Name: sceneModels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."sceneModels" (
    id integer NOT NULL,
    key character varying(255) NOT NULL,
    index integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "lobbyId" integer,
    "hallId" integer,
    "boothId" integer,
    "stageId" integer
);


ALTER TABLE public."sceneModels" OWNER TO postgres;

--
-- Name: sceneModels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."sceneModels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."sceneModels_id_seq" OWNER TO postgres;

--
-- Name: sceneModels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."sceneModels_id_seq" OWNED BY public."sceneModels".id;


--
-- Name: sceneTemplates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."sceneTemplates" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    path character varying(255) NOT NULL,
    status public."enum_sceneTemplates_status" DEFAULT 'ACTIVE'::public."enum_sceneTemplates_status",
    "sceneType" public."enum_sceneTemplates_sceneType" DEFAULT 'BOOTH'::public."enum_sceneTemplates_sceneType",
    attributes json,
    thumb character varying(255),
    data json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."sceneTemplates" OWNER TO postgres;

--
-- Name: sceneTemplates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."sceneTemplates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."sceneTemplates_id_seq" OWNER TO postgres;

--
-- Name: sceneTemplates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."sceneTemplates_id_seq" OWNED BY public."sceneTemplates".id;


--
-- Name: stages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stages (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    status public.enum_stages_status DEFAULT 'ACTIVE'::public.enum_stages_status,
    description text,
    "zoomMeeting" json,
    attributes json,
    "centreScreenUrl" character varying(255),
    "bannerLeftUrl" character varying(255),
    "bannerRightUrl" character varying(255),
    "youtubeUrl" character varying(255),
    type public.enum_stages_type DEFAULT 'IMAGE'::public.enum_stages_type,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sceneTemplateId" integer,
    "lobbyId" integer
);


ALTER TABLE public.stages OWNER TO postgres;

--
-- Name: stages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stages_id_seq OWNER TO postgres;

--
-- Name: stages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stages_id_seq OWNED BY public.stages.id;


--
-- Name: tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tests (
    id integer NOT NULL,
    "assetId" integer,
    "stageId" integer
);


ALTER TABLE public.tests OWNER TO postgres;

--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tokens_id_seq OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying(255) DEFAULT ''::character varying,
    "lastName" character varying(255) DEFAULT ''::character varying,
    email character varying(255),
    phone character varying(255),
    "userName" character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "roleId" integer,
    avatar character varying(255),
    status public.enum_users_status DEFAULT 'ACTIVE'::public.enum_users_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "organizerId" integer,
    "boothId" integer,
    "timeSession" integer DEFAULT 0,
    "lastActivity" timestamp with time zone,
    "selfRegister" boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    device public.enum_visits_device DEFAULT 'BROWSER'::public.enum_visits_device,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "boothId" integer,
    "userId" integer,
    "hallId" integer,
    "stageId" integer
);


ALTER TABLE public.visits OWNER TO postgres;

--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.visits_id_seq OWNER TO postgres;

--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- Name: assets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets ALTER COLUMN id SET DEFAULT nextval('public.assets_id_seq'::regclass);


--
-- Name: boothResources id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."boothResources" ALTER COLUMN id SET DEFAULT nextval('public."boothResources_id_seq"'::regclass);


--
-- Name: booths id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booths ALTER COLUMN id SET DEFAULT nextval('public.booths_id_seq'::regclass);


--
-- Name: chatConversations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chatConversations" ALTER COLUMN id SET DEFAULT nextval('public."chatConversations_id_seq"'::regclass);


--
-- Name: chatMessages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chatMessages" ALTER COLUMN id SET DEFAULT nextval('public."chatMessages_id_seq"'::regclass);


--
-- Name: collectors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collectors ALTER COLUMN id SET DEFAULT nextval('public.collectors_id_seq'::regclass);


--
-- Name: halls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.halls ALTER COLUMN id SET DEFAULT nextval('public.halls_id_seq'::regclass);


--
-- Name: landings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landings ALTER COLUMN id SET DEFAULT nextval('public.landings_id_seq'::regclass);


--
-- Name: lobbies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lobbies ALTER COLUMN id SET DEFAULT nextval('public.lobbies_id_seq'::regclass);


--
-- Name: organizers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizers ALTER COLUMN id SET DEFAULT nextval('public.organizers_id_seq'::regclass);


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: resourceHubs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."resourceHubs" ALTER COLUMN id SET DEFAULT nextval('public."resourceHubs_id_seq"'::regclass);


--
-- Name: rolePermissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."rolePermissions" ALTER COLUMN id SET DEFAULT nextval('public."rolePermissions_id_seq"'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: routes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes ALTER COLUMN id SET DEFAULT nextval('public.routes_id_seq'::regclass);


--
-- Name: sceneAssets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneAssets" ALTER COLUMN id SET DEFAULT nextval('public."sceneAssets_id_seq1"'::regclass);


--
-- Name: sceneModels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneModels" ALTER COLUMN id SET DEFAULT nextval('public."sceneModels_id_seq"'::regclass);


--
-- Name: sceneTemplates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneTemplates" ALTER COLUMN id SET DEFAULT nextval('public."sceneTemplates_id_seq"'::regclass);


--
-- Name: stages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stages ALTER COLUMN id SET DEFAULT nextval('public.stages_id_seq'::regclass);


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assets (id, name, status, type, value, "createdAt", "updatedAt", "boothId") FROM stdin;
60	Delegate Booth - 1500X400	ACTIVE	MEDIA	Delegate_Booth_1500_X400_94de10d1cf-22913c68-71a9-494b-a51b-66961e7a9c42.png	2021-01-21 23:42:45.309+07	2021-01-21 23:42:45.309+07	2
62	Delegatebooth_Screen1_1920x1080	ACTIVE	MEDIA	Delegatebooth_Screen1_1920x1080_481decc9fe-d0b10e37-5963-4f7f-bf76-8509eb79b3c8.png	2021-01-21 23:43:38.362+07	2021-01-21 23:43:38.362+07	2
64	Event category banners_EventCatBanners_Alcohol	ACTIVE	MEDIA	Event_category_banners_Event_Cat_Banners_Alcohol_0ec297dd06-03d50442-9388-4d8b-bc26-30a86487201c.png	2021-01-21 23:44:08.885+07	2021-01-21 23:44:08.885+07	2
66	Infobooth_RollupBanner_788x1800	ACTIVE	MEDIA	Infobooth_Rollup_Banner_788x1800_38df1a6914-e0f94675-8d3e-4086-bead-baa489e0e5a6.png	2021-01-21 23:44:42.57+07	2021-01-21 23:44:42.57+07	2
68	Infobooth_Standee2_200x270	ACTIVE	MEDIA	Infobooth_Standee2_200x270_5c48e10015-7eef22c7-db0f-4dba-bca8-3724f657dba4.png	2021-01-21 23:45:06.205+07	2021-01-21 23:45:06.205+07	2
70	Lobby_Screen1_1920x1080	ACTIVE	MEDIA	Lobby_Screen1_1920x1080_abe35a9616-0702501a-bff8-4dc8-af04-b0d4c7844374.png	2021-01-21 23:45:47.599+07	2021-01-21 23:45:47.599+07	2
72	Main Stage_Main Stage Banner (Main)_1920x1080	ACTIVE	MEDIA	Main_Stage_Main_Stage_Banner_Main_1920x1080_2518a33d5f-933d340c-f524-4464-bd87-e941edd59539.png	2021-01-21 23:46:25.802+07	2021-01-21 23:46:25.802+07	2
74	Main Stage_Main Stage Side Banners_655x1200_1	ACTIVE	MEDIA	Main_Stage_Main_Stage_Side_Banners_655x1200_1_1df81f143a-d997331b-c89b-4e61-a68f-7a3183433bd4.png	2021-01-21 23:47:28.651+07	2021-01-21 23:47:28.651+07	2
76	Main Stage_Main Stage Side Banners_655x1200_3	ACTIVE	MEDIA	Main_Stage_Main_Stage_Side_Banners_655x1200_3_875918289c-2acb08c8-9fd6-4092-b3e6-446eee92ad76.png	2021-01-21 23:48:30.555+07	2021-01-21 23:48:30.555+07	2
78	CNY Home Bakers	ACTIVE	MEDIA	Event_category_banners_Event_Cat_Banners_New_Year_Goodies_06_112e3ead43-35a0e3d0-5919-4ee8-96d2-f51d0af6c1c3.png	2021-01-21 23:49:19.148+07	2021-01-21 23:49:19.148+07	2
80	Icon - Alcohol	ACTIVE	MEDIA	Category_Alcohol_8a244c0587-76cbfdcc-37f9-443d-a5e1-e935b485c9aa.png	2021-01-21 23:50:03.208+07	2021-01-21 23:50:03.208+07	2
82	Icon - Lifestyle	ACTIVE	MEDIA	Category_Lifestyle_31c060825f-9d96580c-d2ff-46a3-9d9e-5f960c400604.png	2021-01-21 23:50:54.061+07	2021-01-21 23:50:54.061+07	2
84	Desktop	ACTIVE	MEDIA	Desktop_Landing_Page_1920x1004_0422f1d67b-cd28b261-4410-47ce-9314-ab536c20fac6.png	2021-01-21 23:51:30.351+07	2021-01-21 23:51:30.351+07	2
86	Logo	ACTIVE	MEDIA	Site_Logo_150x50_a2fe70f45d-f38a90d5-bcdc-41e2-b639-2cf06bbb1475.png	2021-01-21 23:52:03.182+07	2021-01-21 23:53:04.238+07	2
88	Grand Draw TV	ACTIVE	MEDIA	granddraw_infodesk_lobby_Infobooth_Screen_1920x1080_f870a7326f-e6b8ff60-7aa0-4463-af89-ed24440b92a2.png	2021-01-21 23:53:57.234+07	2021-01-21 23:53:57.234+07	2
90	Main Stage - Right	ACTIVE	MEDIA	Main_Stage_Rollup_788x1800shopnow_8b0c3106c0-8d782ec3-b918-414c-96b5-12035bbc9944.png	2021-01-21 23:54:38.017+07	2021-01-21 23:54:38.017+07	2
92	Notif - Cashback (64x64)	ACTIVE	MEDIA	Notif_Cashback_64x64_3b87d13971-5d0833df-5ef2-4e33-afaf-034b65599ddc.png	2021-01-21 23:55:13.214+07	2021-01-21 23:55:13.214+07	2
94	Notif - Grand Draw(64x64)	ACTIVE	MEDIA	Notif_Grand_Draw_64x64_833cca07d6-3f613d5b-8fbb-48d2-b6fe-e961bccb133d.png	2021-01-21 23:55:56.416+07	2021-01-21 23:55:56.416+07	2
96	Notif - Main Stage (64x64)	ACTIVE	MEDIA	Notif_Main_Stage_64x64_8375396312-e4219d5a-822d-4c7b-921c-969a53224325.png	2021-01-21 23:56:43.49+07	2021-01-21 23:56:43.49+07	2
98	Notif - Prize (64x64)	ACTIVE	MEDIA	Notif_Prize_64x64_5c17f132d8-505108a5-d589-4b94-910a-5cf67a15dd61.png	2021-01-21 23:57:41.914+07	2021-01-21 23:57:41.914+07	2
100	Info Desk - Event Directory	ACTIVE	MEDIA	Info_Booth_Event_Agenda_200x240_e921bc8c53-c1f36a59-4be0-42e2-b915-dbd9a09e353b.png	2021-01-21 23:58:36.458+07	2021-01-21 23:58:36.458+07	2
102	Main Stage Left 1	ACTIVE	MEDIA	Main_Stage_Main_Stage_Side_Banners_756x1740_1_29392ea93e-10f5d414-32d3-445c-932d-429073c821c4.png	2021-01-21 23:59:29.343+07	2021-01-21 23:59:29.343+07	2
104	Main Stage Agenda	ACTIVE	MEDIA	Main_Stage_Main_Stage_Banner_Main_1920x1080_2518a33d5f-3db1c02e-291e-41d9-9468-83327b56d4f0.png	2021-01-22 00:00:49.619+07	2021-01-22 00:00:49.619+07	2
106	Main Stage Left 3	ACTIVE	MEDIA	Main_Stage_Main_Stage_Side_Banners_756x1740_3_f33827feff-6a551bb0-f683-41fa-bda9-a428d8015d04.png	2021-01-22 00:01:46.784+07	2021-01-22 00:01:46.784+07	2
109	Happy new year 1	ACTIVE	MEDIA	Desktop_Landing_Page_1920x1004_0422f1d67b-0d6d66c6-26b8-4565-8d5e-73243c863108.png	2021-02-12 00:16:25.185+07	2021-02-12 00:16:25.185+07	20
112	Image 2	ACTIVE	MEDIA	Pan_Pacific_Singapore_Booth_Image_3_69695342cd_c6fa3de884-75082857-36e6-4f44-901e-b3a1de7ec531.jpeg	2021-02-20 22:41:44.043+07	2021-02-20 22:41:44.043+07	19
114	Image 1	ACTIVE	MEDIA	Mumbai_Image_Singapore_Booth_Image_1_8083b59f63_13bbcf1538-ff47eba4-7cf8-46e6-a6e7-7b39cb6827f7.png	2021-02-20 22:52:47.716+07	2021-02-20 22:52:47.716+07	21
117	Giới thiệu website	ACTIVE	CONTENT	![](https://virtualeventuet.nyc3.cdn.digitaloceanspaces.com/assets/99/Lobby_Promotions_1920x1080_3abb499fe2-675ebee5-9865-443f-baeb-4da8d97130f0.png)\n**Sự ra đời của doanh nghiệp**\n\nĐiều đầu tiên khách hàng quan tâm khi truy cập vào website là gốc gác của chủ website. Giữa thị trường thật giả lẫn lộn thì người mua luôn cần biết và tìm hiểu kỹ về nơi mà họ sẽ trao niềm tin, gửi hy vọng. Do đó, hãy chủ động cho họ biết bạn là ai và tóm tắt về sự ra đời của doanh nghiệp để khách hàng nắm bắt được tình hình.\n\nHãy tóm tắt một cách ngắn gọn nhất có thể. Bạn có thể tập trung vào các ý sau:\n\nĐề cập đến nhu cầu sử dụng sản phẩm/dịch vụ ==> Website ra đời và giải quyết nhu cầu đó\nĐặt vấn đề cần giải quyết ==> Đây là nơi xử lý triệt để\nCách viết bài giới thiệu website tốt nhất là viết chân thành\n\n\n**Sứ mệnh và giá trị cốt lõi của doanh nghiệp**\n\nKhoan hãy nói về thông tin liên hệ cũng như trình bày những ưu điểm do bạn tự nói về mình. Hãy cho khách hàng thấy những mục tiêu và giá trị mà doanh nghiệp của bạn muốn hướng đến. Ví dụ như website bán bột rau sấy lạnh thì hãy nói về sứ mệnh làm mát cuộc sống và giá trị mà sản phẩm mang đến cho người dùng là gì?\n\nĐừng tự khen mình là “tốt nhất”, “rẻ nhất” mà hãy để khách hàng tự trải nghiệm những điều ấy. Vì khi tìm hiểu về một sản phẩm thì người mua cần biết chính xác những gì mà họ nhận được cũng như sản phẩm ấy sẽ mang lại cho họ những giá trị gì. Nếu bạn làm nổi bật những giá trị độc đáo trong phần này thì sẽ tiếp thêm động lực cho người đọc đi tiếp sang phần sau. Cách viết bài giới thiệu website cũng không quá khó nhỉ?	2021-03-13 23:39:20.831+07	2021-03-13 23:43:13.855+07	2
123	Lobby right	ACTIVE	MEDIA	GE_Virtual_Lobby_Right_afd30d0dde-01db7237-6862-480f-9d5b-a44e2b03c942.png	2021-04-26 19:40:58.941+07	2021-04-26 19:40:58.941+07	2
125	Lobby main stage	ACTIVE	MEDIA	Lobby_Main_Stage_Agenda_42c2599f20-c8f0bf1b-0aac-4cbb-bf92-b2dacc3682b5.png	2021-04-26 19:41:51.307+07	2021-04-26 19:41:51.307+07	2
127	Info Desk Left Brochure	ACTIVE	MEDIA	Info_Desk_Left_Brochure_11aa3277e4-70036636-0df9-43e4-8051-3ecaa37a2155.png	2021-04-26 19:44:40.42+07	2021-04-26 19:44:40.42+07	2
129	Info Desk TV	ACTIVE	MEDIA	Info_Desk_TV_70b6c8cb18-b13dc942-00bb-4c1c-9b2d-84aadf8f10ed.png	2021-04-26 19:45:35.137+07	2021-04-26 19:45:35.137+07	2
131	GE_Virtual_Booth_Image_2	ACTIVE	MEDIA	GE_Virtual_Booth_Image_2_1000x316_2bf6c15ef0-f5e9cee2-087b-4e8e-b89f-f60d99a7ad45.png	2021-04-26 19:48:27.337+07	2021-04-26 19:48:27.337+07	2
133	GE_Virtual_Booth_Image_3	ACTIVE	MEDIA	GE_Virtual_Booth_Image_3_788x1800_5b5bb709a8-ebcc5a9b-8859-4470-bc94-84a576dd6b56.png	2021-04-26 19:49:58.816+07	2021-04-26 19:49:58.816+07	2
135	Beauty_and_Fashion	ACTIVE	MEDIA	Beauty_and_Fashion_534615eabf-7a08e9be-2d8b-479e-8457-18a7d317c561.png	2021-04-26 19:57:49.328+07	2021-04-26 19:57:49.328+07	2
137	ICON_Hall_Banner_Right	ACTIVE	MEDIA	ICON_Hall_Banner_Right_de51034b70-9fa3bfe9-58e7-4da6-8a7d-fac437a8b75d.jpeg	2021-04-26 19:58:46.398+07	2021-04-26 19:58:46.398+07	2
139	GE_Virtual_Hall_Left	ACTIVE	MEDIA	GE_Virtual_Hall_Left_19e45db9b0-39c3a025-3b46-4dae-9c38-2cd9014c92c3.png	2021-04-26 20:02:28.868+07	2021-04-26 20:02:28.868+07	2
141	Flowers_and_Styling	ACTIVE	MEDIA	Flowers_and_Styling_74f72252c1-3cdb5672-69ec-428e-88dc-009afd4c88a8.png	2021-04-26 20:07:46.206+07	2021-04-26 20:07:46.206+07	2
61	Delegatebooth_RollupBanner_788x1800	ACTIVE	MEDIA	Delegatebooth_Rollup_Banner_788x1800_8df732aeec-f44dbb8c-d4f7-4aba-9637-40610d7c6c2b.png	2021-01-21 23:43:23.71+07	2021-01-21 23:43:23.71+07	2
63	Delegatebooth_Screen2_1920x1080	ACTIVE	MEDIA	Delegatebooth_Screen2_1920x1080_06a0fbb783-31b7e8df-bdd4-41a4-a08a-3bf74c75d993.png	2021-01-21 23:43:54.037+07	2021-01-21 23:43:54.037+07	2
65	Event category banners_EventCatBanners_Catering	ACTIVE	MEDIA	Event_category_banners_Event_Cat_Banners_Catering_25eb6cb5a4-1c36b2f2-e508-40b9-a8f3-1dbe8bd2fd7b.png	2021-01-21 23:44:28.423+07	2021-01-21 23:44:28.423+07	2
67	Infobooth_Standee1_200x270	ACTIVE	MEDIA	Infobooth_Standee1_200x270_8f6c73c147-4bca365d-59f1-4124-aa02-c8e068b5a815.png	2021-01-21 23:44:54.442+07	2021-01-21 23:44:54.442+07	2
69	Lobby_Main_1920x1080	ACTIVE	MEDIA	Lobby_Main_1920x1080_ef34edc98f-07f843ff-3361-40f8-80f6-9f25b9dfe78c.png	2021-01-21 23:45:31.374+07	2021-01-21 23:45:31.374+07	2
71	Main Stage_Main Stage poster_785 x 1500	ACTIVE	MEDIA	Main_Stage_Main_Stage_poster_785_x_1500_f2ba187e57-aca1df20-1c72-40ff-a796-1233434e8c73.png	2021-01-21 23:46:00.172+07	2021-01-21 23:46:00.172+07	2
73	Main Stage_Main Stage Banner (Main)_1920x1080 End	ACTIVE	MEDIA	Main_Stage_Main_Stage_Banner_Main_1920x1080_End_aba5bcefbb-e9dacfd4-0560-44c6-bbd7-996a15cf1e51.png	2021-01-21 23:47:00.927+07	2021-01-21 23:47:00.927+07	2
75	Main Stage_Main Stage Side Banners_655x1200_4	ACTIVE	MEDIA	Main_Stage_Main_Stage_Side_Banners_655x1200_4_bac5e9a4c2-526b32bc-6dc2-4c37-89b6-cfb05500b41c.png	2021-01-21 23:48:05.72+07	2021-01-21 23:48:05.72+07	2
77	Icon - Home Bakers	ACTIVE	MEDIA	Category_Bakers_8963395fa5-4ab08d1a-e249-4867-a4cb-1108d47d3bee.png	2021-01-21 23:48:44.854+07	2021-01-21 23:48:44.854+07	2
79	Hall Right - Grand Draw	ACTIVE	MEDIA	hall_granddraw_655x1200_9f4695f502-53cfe45b-e6e6-403a-bb43-3c7ca65c4d7b.png	2021-01-21 23:49:40.547+07	2021-01-21 23:49:40.547+07	2
81	Home Bakers	ACTIVE	MEDIA	Event_category_banners_Event_Cat_Banners_New_Year_Goodies_03_01a7b55ee6-aef0a262-541f-42ed-a37d-6ef7cb7e1148.png	2021-01-21 23:50:29.898+07	2021-01-21 23:50:29.898+07	2
83	Icon - Catering	ACTIVE	MEDIA	Category_Catering_ff37b50a35-28d26de0-6778-444e-8a5f-60142d487e06.png	2021-01-21 23:51:13.716+07	2021-01-21 23:51:13.716+07	2
85	Mobile	ACTIVE	MEDIA	Mobile_Landing_Page_750x1472_75ac052f58-28dc42bd-a1c8-46e7-a80a-f3a6b2b0e8c2.png	2021-01-21 23:51:49.259+07	2021-01-21 23:51:49.259+07	2
87	Favicon	ACTIVE	MEDIA	Favicon_64x64_99a6051734-9ed0b37e-8f2c-478d-a9d9-f335e1e2fd6a.png	2021-01-21 23:52:34.822+07	2021-01-21 23:52:34.822+07	2
89	Lifestyle	ACTIVE	MEDIA	Event_Category_Banners_Event_Cat_Banners_Other_Services_ea09348354-d805fbac-cf56-4b66-a1e8-4adf3df07833.png	2021-01-21 23:54:14.976+07	2021-01-21 23:54:14.976+07	2
91	Hall Left - Cashback	ACTIVE	MEDIA	Hall_Cashback_655x1200shopnow_72c59213e4-0de8e119-417d-430b-aa76-4cd6d3947e0b.png	2021-01-21 23:54:57.06+07	2021-01-21 23:54:57.06+07	2
93	Notif - Generic (64x64)	ACTIVE	MEDIA	Notif_Generic_64x64_895075823a-613fa5c1-861d-453e-aaa8-d3f87275df4b.png	2021-01-21 23:55:34.643+07	2021-01-21 23:55:34.643+07	2
95	Notif - Lucky Draw(64x64)	ACTIVE	MEDIA	Notif_Lucky_Draw_64x64_f5cdd44112-c0c81176-d1a5-4481-8b2f-d02aabfd6b3a.png	2021-01-21 23:56:19.285+07	2021-01-21 23:56:19.285+07	2
97	Notif - Main Stage text(64x64)	ACTIVE	MEDIA	Notif_Main_Stage_text_64x64_fcf94ffa57-16cc289e-329f-49e4-a934-8af92c40495f.png	2021-01-21 23:57:19.19+07	2021-01-21 23:57:19.19+07	2
99	Lobby - Event Exclusive	ACTIVE	MEDIA	Lobby_Promotions_1920x1080_3abb499fe2-675ebee5-9865-443f-baeb-4da8d97130f0.png	2021-01-21 23:58:12.468+07	2021-01-21 23:58:12.468+07	2
101	Navigate	ACTIVE	MEDIA	Frame_1_LNYVB_Welcome_image_b4d06b90e8-a7519e43-a5c7-4219-b4dd-5766d7d73a8c.png	2021-01-21 23:59:03.766+07	2021-01-21 23:59:03.766+07	2
103	Main Stage Right 2	ACTIVE	MEDIA	Main_Stage_Main_Stage_Rollup_Banner_756_X1740_2_858385dd02-e8d40c1f-8e17-4d9f-a9d3-9b0e06574990.png	2021-01-21 23:59:54.637+07	2021-01-21 23:59:54.637+07	2
59	Delegate Booth - 1000 x 360	ACTIVE	MEDIA	Delegate_Booth_1000x360_91a38d85e7-084bdac0-1473-4c33-aaff-2d76c5f34e67.png	2021-01-21 23:42:20.94+07	2021-01-21 23:42:20.94+07	2
105	Main Stage End	ACTIVE	MEDIA	Main_Stage_Main_Stage_Banner_Main_1920x1080_End_058062a3ae-d980953e-a3df-4440-b875-1cfdb4c067f6.png	2021-01-22 00:01:15.014+07	2021-01-22 00:01:15.014+07	2
107	Main Stage Right 4	ACTIVE	MEDIA	Main_Stage_Main_Stage_Side_Banners_756x1740_4_8b2044d52d-c963c536-6db6-4c04-91ef-f802c41fbe1a.png	2021-01-22 00:02:11.981+07	2021-01-22 00:02:11.981+07	2
108	Chuc mung nam moi	ACTIVE	MEDIA	Delegatebooth_Screen2_1920x1080_06a0fbb783-ca61a08d-8701-4b26-b201-2f84f08d3784.png	2021-02-12 00:15:42.525+07	2021-02-12 00:15:42.525+07	20
110	Asset 1	ACTIVE	MEDIA	Delegatebooth_Rollup_Banner_788x1800_8df732aeec-34cb11a1-9bd7-48d8-99eb-a78ed4f9113a.png	2021-02-18 22:12:21.367+07	2021-02-18 22:12:21.367+07	20
111	Image 1	ACTIVE	MEDIA	Pan_Pacific_Singapore_Booth_Image_1_c4da0a16db_b7c7c20eaa-faddb133-af60-4be4-a106-7040ae876b65.jpeg	2021-02-20 22:41:19.732+07	2021-02-20 22:41:19.732+07	19
113	Image	ACTIVE	MEDIA	Delegate_Booth_1000x360_91a38d85e7-61fff1c2-822a-4151-8cba-223d9bed14a9.png	2021-02-20 22:44:52.96+07	2021-02-20 22:44:52.96+07	20
115	Image 2	ACTIVE	MEDIA	Mumbai_Image_Singapore_Booth_Image_3_31c2a39844_b9f5c8bbb1-fd08ab91-e6d5-4bb2-a489-2e3e8845f617.png	2021-02-20 22:53:27.26+07	2021-02-20 22:53:27.26+07	21
118	Video	ACTIVE	MEDIA	file_example_MP4_640_3MG-ac182744-c451-450e-b10e-1f3344406421.mp4	2021-03-14 23:11:26.803+07	2021-03-14 23:11:26.803+07	2
121	Main stage background	ACTIVE	MEDIA	stage_light_eb2411f4b5-c3cf589d-d236-4c35-8fe9-e8e36f469a58.jpeg	2021-03-20 00:11:59.589+07	2021-03-20 00:11:59.589+07	2
122	Lobby center	ACTIVE	MEDIA	Lobby_Centre_aa899207c1-501cca95-c7c4-4268-bb88-f9923af3903c.jpeg	2021-04-26 19:40:25.473+07	2021-04-26 19:40:25.473+07	2
124	Lobby left	ACTIVE	MEDIA	GE_Virtual_Lobby_Left_97f1669f6c-a114c459-c3e3-4e2a-be58-398b37f2c350.jpeg	2021-04-26 19:41:27.553+07	2021-04-26 19:41:27.553+07	2
126	Info desk pull up	ACTIVE	MEDIA	Info_Desk_Pull_up_Banner_f6ebd5ed62-749be8c0-f33f-4109-a3fa-398f13a81b6e.png	2021-04-26 19:44:10.002+07	2021-04-26 19:44:10.002+07	2
128	Info Desk Right Brochure	ACTIVE	MEDIA	Info_Desk_Right_Brochure_18c3feb47b-a18633f2-0f1c-486a-8c94-d48b1494f5c6.png	2021-04-26 19:45:11.685+07	2021-04-26 19:45:11.685+07	2
130	GE_Virtual_Booth_Image_1	ACTIVE	MEDIA	GE_Virtual_Booth_Image_1_1500x400_2395247ff3-487a625f-44d8-4ae8-a35c-42185f491144.png	2021-04-26 19:47:56.42+07	2021-04-26 19:47:56.42+07	2
132	GE_Virtual_Booth_Image_5	ACTIVE	MEDIA	GE_Virtual_Booth_Image_5_1920x1080_3b8b79d8ea-8f474faf-30a5-4a3c-91dc-49577246e7db.png	2021-04-26 19:49:11.357+07	2021-04-26 19:49:11.357+07	2
134	GE_Virtual_Booth_Image_4	ACTIVE	MEDIA	GE_Virtual_Booth_Image_4_1920x1080_d0efeda941-b154757f-90c8-4c9f-82d6-055b39a3b059.mp4	2021-04-26 19:50:30.752+07	2021-04-26 19:50:30.752+07	2
136	ICON_Hall_Banner_Left	ACTIVE	MEDIA	ICON_Hall_Banner_Left_becd30842f-c5efcbf6-be08-4819-835a-a36166d4d9e3.jpeg	2021-04-26 19:58:24.05+07	2021-04-26 19:58:24.05+07	2
138	Venues_and_Catering	ACTIVE	MEDIA	Venues_and_Catering_9223a67480-0078d75a-5ea8-435f-898d-46560670b5dc.png	2021-04-26 20:01:52.668+07	2021-04-26 20:01:52.668+07	2
140	GE_Virtual_Hall_Right	ACTIVE	MEDIA	GE_Virtual_Hall_Right_a0d4e1df1e-e023f2c7-5a70-40eb-9d76-6197b78590c3.png	2021-04-26 20:02:54.669+07	2021-04-26 20:02:54.669+07	2
142	MODE_Hall_Banner_Right	ACTIVE	MEDIA	MODE_Hall_Banner_Right_fecd35665f-679f023a-84ac-4dea-8863-f0353245405e.jpeg	2021-04-26 20:08:06.892+07	2021-04-26 20:08:06.892+07	2
143	MODE_Hall_Banner_Left	ACTIVE	MEDIA	MODE_Hall_Banner_Left_8690c4ac08-dfd61e01-f9b9-48df-95fe-fd3e46924c69.jpeg	2021-04-26 20:08:28.126+07	2021-04-26 20:08:28.126+07	2
144	Photography_and_Videography	ACTIVE	MEDIA	Photography_and_Videography_c54f6f768c-562c1dc8-0bb8-44cb-9ca1-7eb484114768.png	2021-04-26 20:11:15.745+07	2021-04-26 20:11:15.745+07	2
145	Other_Services	ACTIVE	MEDIA	Other_Services_e3cd4a22cd-40be96a9-aa60-41fb-a5dd-8dc9a852c1a4.png	2021-04-26 20:13:21.285+07	2021-04-26 20:13:21.285+07	2
146	Alliance_Coffee_Booth	ACTIVE	MEDIA	Alliance_Coffee_Booth_Image_1_76694ec139-1bfe8c9a-959d-41e5-a989-9c0861a94917.png	2021-04-26 20:53:56.986+07	2021-04-26 20:53:56.986+07	24
147	Alliance_Coffee_Booth_Image_2	ACTIVE	MEDIA	Alliance_Coffee_Booth_Image_2_7dfc5b1a5a-b4cadcb3-d39f-482d-a7e5-78b24c39f28e.png	2021-04-26 20:54:38.933+07	2021-04-26 20:54:38.933+07	24
148	Alliance_Coffee_Booth_Image_3	ACTIVE	MEDIA	Alliance_Coffee_Booth_Image_3_4d91a9453c-cca1877c-d2bc-4cf3-bdfa-7cf19e4314e9.png	2021-04-26 20:55:46.853+07	2021-04-26 20:55:46.853+07	24
149	Alliance_Coffee_Booth_Image_4	ACTIVE	MEDIA	Alliance_Coffee_Booth_Image_4_1b2c2bd84a-bda37917-7b3d-403b-8be2-64cc589e080d.png	2021-04-26 20:56:38.4+07	2021-04-26 20:56:38.4+07	24
150	Alliance_Coffee_Booth_Image_5	ACTIVE	MEDIA	Alliance_Coffee_Booth_Image_5_2d782957b3-97dc5fba-98ba-4856-9c6c-b29b88244714.png	2021-04-26 20:57:33.431+07	2021-04-26 20:57:33.431+07	24
151	Esseplore_Booth_Image_1	ACTIVE	MEDIA	Esseplore_Booth_Image_1_8d32ef45f1-1da2bfad-c15d-42ba-aabd-432d0a5af7b6.png	2021-04-26 21:15:05.421+07	2021-04-26 21:15:05.421+07	25
152	booth_photo	ACTIVE	MEDIA	booth_photo_f12023a3eb-64d43363-461a-4004-8531-87af15ddf30a.jpeg	2021-04-26 21:15:25.238+07	2021-04-26 21:15:25.238+07	25
153	Esseplore_Booth_Image_3	ACTIVE	MEDIA	Esseplore_Booth_Image_3_d23bc077cd-e85e9c86-6832-408e-aaed-786806bc88be.png	2021-04-26 21:15:45.117+07	2021-04-26 21:15:45.117+07	25
154	Video 1	ACTIVE	MEDIA	feastbox_video_33a43e4b6d-e58e714a-d651-4a43-8fc3-03636aad287f.mp4	2021-04-26 21:16:57.35+07	2021-04-26 21:16:57.35+07	25
155	Video 2	ACTIVE	MEDIA	Whats_App_Video_2021_04_13_at_6_17_39_PM_b6bcd8fba9-0d22247a-e0d5-483d-9365-34fd8cced463.mp4	2021-04-26 21:17:25.608+07	2021-04-26 21:17:25.608+07	25
156	Booth Image 1	ACTIVE	MEDIA	Booth_Image_1_b695bf393f-57432f73-c55c-4016-b4c7-3b01b270df25.png	2021-04-26 21:23:16.701+07	2021-04-26 21:23:16.701+07	26
157	Booth Image 2 	ACTIVE	MEDIA	Booth_Image_2_85ada93152-65964ea6-1afc-4181-a673-fc25c067d230.png	2021-04-26 21:23:33.708+07	2021-04-26 21:23:33.708+07	26
158	Booth Image 3	ACTIVE	MEDIA	Novotel_Singapore_on_Stevens_Booth_Image_3_b98e94bb46-df073608-9469-42bc-8a5e-a3cbc630d11a.png	2021-04-26 21:24:09.468+07	2021-04-26 21:24:09.468+07	26
159	Booth Image 4	ACTIVE	MEDIA	Booth_Image_4_6d04cdf764-7aef1bdc-c8d9-4c8d-a3e3-1df44de6d9c0.mp4	2021-04-26 21:24:47.147+07	2021-04-26 21:24:47.147+07	26
160	Booth Image 5	ACTIVE	MEDIA	Novotel_Singapore_on_Stevens_Booth_Image_5_825361b0cf-494481c4-7fac-4180-b330-04152b3ba74e.png	2021-04-26 21:25:12.353+07	2021-04-26 21:25:12.353+07	26
161	Booth Image 1	ACTIVE	MEDIA	Lexis_Hibiscus_Port_Dickson_Booth_Image_1_fb4448a1f6-683a49a6-3770-4bc1-b1f8-102b75b25f85.png	2021-04-26 21:26:41.589+07	2021-04-26 21:26:41.589+07	27
162	Booth Image 2	ACTIVE	MEDIA	Lexis_Hibiscus_Port_Dickson_Booth_Image_2_3a3900698d-e951c4af-c8ab-4d51-a210-27e8a8f7654c.png	2021-04-26 21:27:07.739+07	2021-04-26 21:27:07.739+07	27
163	Booth Image 5	ACTIVE	MEDIA	Lexis_Hibiscus_Port_Dickson_Booth_Image_5_6bcf1ebd26-c285e6c8-44c1-440e-a0b0-827b84d3817e.png	2021-04-26 21:27:36.542+07	2021-04-26 21:27:36.542+07	27
164	Booth Image 3	ACTIVE	MEDIA	Lexis_Hibiscus_Port_Dickson_Booth_Image_3_5b00b2d64a-4db3a887-5579-4c7d-a04f-9c8611feac68.png	2021-04-26 21:27:59.103+07	2021-04-26 21:27:59.103+07	27
165	Booth Image 1	ACTIVE	MEDIA	Susucre_Booth_Image_1_cced16a54b-4f2337b9-03f3-4225-acac-4938aa03f386.png	2021-04-26 21:33:24.7+07	2021-04-26 21:33:24.7+07	28
166	Booth Image 2	ACTIVE	MEDIA	Susucre_Booth_Image_2_1065ba36b8-61461f60-8abe-49d0-83e8-7239ad904f37.png	2021-04-26 21:33:48.22+07	2021-04-26 21:33:48.22+07	28
167	Booth Image 3	ACTIVE	MEDIA	Booth_Image_3_d28063d3c3-c153e788-47e3-4e8d-9b27-91161f620ea5.png	2021-04-26 21:34:09.404+07	2021-04-26 21:34:09.404+07	28
168	Booth Image 4	ACTIVE	MEDIA	Booth_Image_4_6d04cdf764-735e6308-8169-4cda-9730-e74f4a4ebb84.mp4	2021-04-26 21:34:51.932+07	2021-04-26 21:34:51.932+07	28
169	Booth Image 5	ACTIVE	MEDIA	Booth_Image_5_a58bfb9b6c-c0d0f110-99d2-4db0-9cef-2514af413b04.png	2021-04-26 21:35:19.02+07	2021-04-26 21:35:19.02+07	28
170	Booth Image 1	ACTIVE	MEDIA	Regent_Singapore_Booth_Image_1_b41b05aec2-36b9c42c-46f8-4a7c-8f9b-f805dfb49774.png	2021-04-26 21:37:10.884+07	2021-04-26 21:37:10.884+07	29
171	Booth Image 2	ACTIVE	MEDIA	Regent_Singapore_Booth_Image_2_05abf9917a-3567a911-fb64-438a-b27a-822e73e7c9f5.png	2021-04-26 21:37:37.103+07	2021-04-26 21:37:37.103+07	29
172	Booth Image 3	ACTIVE	MEDIA	Regent_Singapore_Booth_Image_3_fcda6c305c-422a404c-fd5c-494d-98bd-b7d7cb5ba5ca.png	2021-04-26 21:37:59.351+07	2021-04-26 21:37:59.351+07	29
173	Booth Image 4	ACTIVE	MEDIA	Regent_Singapore_Booth_Image_4_78ce660df9-04f8b6bb-194c-48cd-bc58-c7711b499daf.png	2021-04-26 21:38:28.463+07	2021-04-26 21:38:28.463+07	29
174	Booth Image 5	ACTIVE	MEDIA	0_108a_7b14de6b5c-6d5ff389-0b47-4546-95d8-87d01d1ab1be.png	2021-04-26 21:39:05.593+07	2021-04-26 21:39:05.593+07	29
175	Booth Image 1	ACTIVE	MEDIA	Mandarin_Orchard_Singapore_Booth_Image_1_c9bd63b87f-a1118f7b-a568-417b-830f-b6eaea10c4fa.png	2021-04-26 21:41:25.36+07	2021-04-26 21:41:25.36+07	30
176	Booth Image 2	ACTIVE	MEDIA	Mandarin_Orchard_Singapore_Booth_Image_2_f8c701bce1-376ac6df-8696-4a57-beac-c88669469de7.png	2021-04-26 21:42:12.146+07	2021-04-26 21:42:12.146+07	30
177	Booth Image 3	ACTIVE	MEDIA	Mandarin_Orchard_Singapore_Booth_Image_3_ee73311827-131297b5-5abd-4742-ba39-8a995e4c3e5c.png	2021-04-26 21:42:30.299+07	2021-04-26 21:42:30.299+07	30
178	Booth Image 4	ACTIVE	MEDIA	Mandarin_Orchard_Singapore_Booth_Image_4_c1f908c5e9-2f6f5a19-8c07-40e4-bb86-c49b6c77661a.png	2021-04-26 21:42:54.833+07	2021-04-26 21:42:54.833+07	30
179	Booth Image 5	ACTIVE	MEDIA	Mandarin_Orchard_Singapore_Booth_Image_5_0b218361d8-9244bf62-2abb-4993-9537-d5f54b12fe69.png	2021-04-26 21:43:19.912+07	2021-04-26 21:43:19.912+07	30
180	Booth Image 1	ACTIVE	MEDIA	Booth_Image_1_bf5fae26cd-e19cfe2c-9881-4237-9e95-23420f00b73b.png	2021-04-26 21:44:48.403+07	2021-04-26 21:44:48.403+07	31
181	Booth Image 2	ACTIVE	MEDIA	Booth_Image_2_d1cd4a1c42-81fc8deb-b13b-45f7-aeab-0d1e9bbb078f.png	2021-04-26 21:45:19.811+07	2021-04-26 21:45:19.811+07	31
182	Booth Image 5	ACTIVE	MEDIA	Booth_Image_5_f7e26f318c-c776ab7f-c140-4bfd-b470-3aabb4511ea1.png	2021-04-26 21:45:59.385+07	2021-04-26 21:45:59.385+07	31
183	Booth Image 3	ACTIVE	MEDIA	The_Outpost_Hotel_Sentosa_Booth_Image_3_627942f8bb-f682e665-c670-441d-adde-726c16e2f8c9.png	2021-04-26 21:46:25.253+07	2021-04-26 21:46:25.253+07	31
184	Booth Image 4	ACTIVE	MEDIA	The_Outpost_Hotel_Sentosa_Booth_Image_4_0feede993c-27ce7286-19cc-4651-aac0-65d5e9550c7c.png	2021-04-26 21:46:50.687+07	2021-04-26 21:46:50.687+07	31
185	Booth Image 1	ACTIVE	MEDIA	The_Capitol_Kempinski_Hotel_Booth_Image_1_4a59e44ee5-08247a0e-b0d6-4003-a0c4-1da0316f1827.png	2021-04-26 21:48:26.705+07	2021-04-26 21:48:26.705+07	32
186	Booth Image 2	ACTIVE	MEDIA	The_Capitol_Kempinski_Hotel_Booth_Image_2_66df56038e-4aee9a73-25ba-4955-af49-160e665c470c.png	2021-04-26 21:48:48.386+07	2021-04-26 21:48:48.386+07	32
187	Booth Image 3	ACTIVE	MEDIA	The_Capitol_Kempinski_Hotel_Booth_Image_3_c2724961ea-d013857f-5afb-474d-976a-11935d92f8e2.png	2021-04-26 21:49:11.867+07	2021-04-26 21:49:11.867+07	32
188	Booth Image 4	ACTIVE	MEDIA	The_Capitol_Kempinski_Hotel_Booth_Image_4_d703181475-ebdcd0eb-166d-4e1a-966c-f910425f8988.mp4	2021-04-26 21:49:56.575+07	2021-04-26 21:49:56.575+07	32
189	Booth Image 5	ACTIVE	MEDIA	The_Capitol_Kempinski_Hotel_Booth_Image_5_47eb50efc7-14967c5d-df5e-4e1b-afc2-99658547412c.png	2021-04-26 21:50:21.431+07	2021-04-26 21:50:21.431+07	32
190	Booth Image 1	ACTIVE	MEDIA	Village_Hotel_Changi_Booth_Image_1_00edc93500-d9b78fb4-3d6b-4603-99bf-b713ce808472.png	2021-04-26 21:52:27.571+07	2021-04-26 21:52:27.571+07	33
191	Booth Image 2	ACTIVE	MEDIA	Village_Hotel_Changi_Booth_Image_2_e90318804f-0a6daee7-a5ff-4ae9-ba43-f2d368eae98a.png	2021-04-26 21:52:46.52+07	2021-04-26 21:52:46.52+07	33
192	Booth Image 3	ACTIVE	MEDIA	Village_Hotel_Changi_Booth_Image_3_430ae130db-878cb1a2-c6a9-4fae-bdb2-e956b339124d.png	2021-04-26 21:53:08.206+07	2021-04-26 21:53:08.206+07	33
193	Booth Image 4	ACTIVE	MEDIA	Village_Hotel_Changi_Booth_Image_4_f5fc57006b-c9f1407b-1c6f-4025-949b-ad1b4c63972c.png	2021-04-26 21:53:28.223+07	2021-04-26 21:53:28.223+07	33
194	Booth Image 5	ACTIVE	MEDIA	Village_Hotel_Changi_Booth_Image_5_c2cc8f68f8-10f30fb0-f7e1-4f99-a50f-9e41d03ccd38.png	2021-04-26 21:53:48.756+07	2021-04-26 21:53:48.756+07	33
195	Main stage center	ACTIVE	MEDIA	Main_Stage_Centre_0b3474d26d-4bc3ef84-d8b8-4093-97c9-614e14a72882.png	2021-04-26 21:57:02.565+07	2021-04-26 21:57:02.565+07	2
196	Main Stage left	ACTIVE	MEDIA	Main_Stage_Left_Banner_09342df6f1-50b0e8b0-0fb5-4f7f-8716-6c82c0f26c83.png	2021-04-26 21:57:38.739+07	2021-04-26 21:57:38.739+07	2
197	Main Stage Right	ACTIVE	MEDIA	Main_Stage_Right_Banner_64ad5a72b1-ed86c0b3-4f3a-4f6f-9080-c2a9e5a53f1b.png	2021-04-26 21:58:06.988+07	2021-04-26 21:58:06.988+07	2
\.


--
-- Data for Name: boothResources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."boothResources" (id, type, value, "createdAt", "updatedAt", "boothId") FROM stdin;
\.


--
-- Data for Name: booths; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booths (id, name, "aboutUs", attributes, "calendlyUrl", type, avatar, "meetingUrl", "createdAt", "updatedAt", "sceneTemplateId", "websiteUrl") FROM stdin;
24	Alliance Coffee	We bring the cafe experience, to your wedding.\n\nAlliance Coffee aims to be Solution Providers First, and Coffee Providers Second.\n\nIn this fast-paced society, we do our best to provide you with SIMPLE, FUSS FREE solutions that will elevate your wedding experience. All these can be done via our Mobile Coffee Catering service.	{"pCube2":{"name":"Booth color","value":{"name":"dark brown","value":"#6C4D3A"}}}	\N	STANDARD	Alliance_Coffee_Logo_106fd6d2d8-35a0bee9-229b-4e67-8ce2-06f2ff55e683.png	\N	2021-04-26 20:22:21.347+07	2021-04-26 21:21:25.049+07	1	\N
29	Regent Singapore	Whether you desire an intimate celebration or a grand banquet, classic elegance or Hollywood glamour, Regent Singapore provides a spectacular backdrop for the beauty and magic of your wedding day. Our wedding specialist will be your trusted confidant in all matters, ensuring diligent attention to every detail, from deciding on the cake, menu and wine selection to organising the floral arrangements and entertainment. Revel in every romantic moment as we create a perfect day of memories you’ll cherish forever.\n	{}	\N	STANDARD	Regent_Singapore_Logo_b03b3892c7-bb2c61a2-6a29-451d-9321-a30a68ab87bf.png	\N	2021-04-26 20:27:19.927+07	2021-04-26 21:39:20.077+07	1	\N
26	Novotel	Be it an intimate solemnisation ceremony or a grand splendour of a wedding, the team at Novotel Singapore on Stevens personalises every wedding to the couple’s style. Ever Yours, Ever Mine, Ever Ours; a timeless and elegant wedding.	{}	\N	STANDARD	Logo_b03144a4c6-4234f7bd-7eb0-438f-9d87-401d9730c6dc.png	\N	2021-04-26 20:24:31.941+07	2021-04-26 21:25:40.242+07	1	\N
28	Susucre	All of our wedding cakes are custom designed to fit your theme, style and wedding décor. Each creation is meticulously hand-crafted, conveying each couple’s story.\n\nOur wedding cakes have been featured in Prestige Magazine, Her World Brides, Style Weddings, Singapore Tatler Weddings, Harper’s Bazaar and Female Brides magazines.\n\nLet us know your ideas, inspirations, pictures and decorations, so we can find the perfect cake. You can also make an appointment and come to our shop for a consultation.\n\nSUSUCRE: WHERE CAKE DREAM COME TO LIFE!	{}	\N	STANDARD	Susucre_Logo_d8aefdbbf5-a3abd64d-2cfd-4e8b-9215-6ab7bd0536f1.png	\N	2021-04-26 20:26:16.043+07	2021-04-26 21:35:29.526+07	1	\N
1	Information Booth	\N	{"help_image":{"name":"Help Centre Image (1920 x 1080)","action":{"type":"newlink","url":"https://www.youtube.com"}}}	\N	INFORMATION	\N	\N	2021-01-10 21:50:45.922+07	2021-04-26 19:45:44.073+07	4	\N
27	Lexis Hibiscus Port Dickson	Overlooking the turquoise waters of the Straits of Malacca from a spectacular beachfront, Lexis Hibiscus Port Dickson provides a breathtaking backdrop for an unforgettable wedding celebration with family and friends. Located just three and a half hours away by car from Singapore, the Lexis Hibiscus provides a truly unique wedding experience for the happy couple and their guests. Our world-record breaking resort is furnished with magnificent ballrooms, serene beachfront, and manicured lawns complements a one-of-a-kind getaway experience for all celebrants in our luxurious water villas with individual private pool and steam room.\n\nOur creative team of wedding planners and caterers will see to every detail. From décor, cuisine, flower arrangements and entertainment, to guest accommodations and recreational activities, everything will meet your vision perfectly. With vast experience in carrying out modern and traditional weddings, be it an intimate beach ceremony for your closest family and friends, or a wedding extravaganza with a thousand celebrants, our team is ready to make your every wedding wish come try at Lexis Hibiscus Port Dickson.	{}	\N	STANDARD	Lexis_Hibiscus_Port_Dickson_Logo_12a0de4644-c75d6775-c719-4e55-a2cf-62a64df212b6.png	\N	2021-04-26 20:25:27.952+07	2021-04-26 21:31:55.004+07	1	\N
2	Organizer Booth	123123	{"booth_image_1":{"name":"Booth Image 1 (1500 x 400 px)","action":{"type":"newlink","url":"https://www.facebook.com"}},"pCube2":{"name":"Booth Colour","value":{"name":"orange","value":"#D98243"}},"booth_image_2":{"name":"Booth Image 2 (1000 x 316 px)","action":{"type":"newlink","url":"https://www.facebook.com"}}}	\N	ORGANIZER	Delegate_Square_Logo_645dd8af8a-cca064bf-b555-4fc8-ab1a-49306cbc6b35.jpeg	https://us04web.zoom.us/j/78108929023?pwd=K01OMmo5eTU5M0ljYnJaM3FnRVZpUT09	2021-01-10 21:50:45.922+07	2021-04-26 19:52:15.805+07	6	https://www.facebook.com/
23	Delegate	\N	\N	\N	STANDARD	\N	\N	2021-01-20 21:58:45.622+07	2021-03-13 23:25:11.02+07	7	\N
22	Bons Bakes	\N	\N	\N	STANDARD	\N	\N	2021-01-20 21:58:15.65+07	2021-03-13 23:25:18.656+07	5	\N
21	Bakery Cuisine	\N	\N	\N	STANDARD	\N	\N	2021-01-20 21:57:44.235+07	2021-03-13 23:25:27.357+07	5	\N
20	Arder	\N	\N	\N	STANDARD	\N	\N	2021-01-20 21:57:14.84+07	2021-03-13 23:25:34.684+07	6	\N
19	AUOLIVE	1-Host features beautiful alternative wedding venues such as 1-Altitude, The Summerhouse, The Alkaff Mansion, The Riverhouse, Monti, The Garage and 1:VU at The Outpost Hotel. 1-Host is renowned for its signature events: elegant 	{}	\N	STANDARD	logo192-db09b63a-b1bb-4d49-8a9b-161b2d48099b.png	\N	2021-01-20 21:56:48.341+07	2021-02-20 22:43:00.941+07	1	\N
25	Esseplore	Hybrid wedding is a concept that merges the physical and virtual aspects of your special day – enjoy an intimate gathering with your loved ones present physically and virtually. Now you can have your dream wedding on a larger (and virtual) scale by livestreaming the celebration of your love for your family and friends across the country.\n\nUrbane Gourmand by Esseplore is a specially designed culinary experience for all social gatherings, enabled by digital technology to bring you the best gourmet experience.\n\nWith a community of private home chefs working from our speciality cloud kitchen led by Executive Chef KT Yeo, our bite sized gourmet boxes can be delivered island-wide!\n\nOptional add-ons include: AV for Live Streaming / Wedding Venue / Doorgifts / Customizable Printing on Food Gift Boxes / Entertainment / Private Chef for Hire / Emcee Hosting	{}	\N	STANDARD	Esseplore_Logo_6dad9b6831-c15607a6-0ab1-4fcc-8ede-ef55405ecd53.png	\N	2021-04-26 20:23:18.318+07	2021-04-26 21:20:54.336+07	1	\N
30	Mandarin Orchard Singapore	Having had the experience of hosting more than 15,000 weddings over the past 50 years makes us one of the most sought-after wedding venues in Singapore. From bespoke services and elegant accommodations to award-winning food and beverage offerings, trust in Mandarin Orchard Singapore to make the wedding of your dreams a reality.\n\nLocated on level 6 of the hotel’s Main Tower, the Grand Mandarin Ballroom boasts a pre-function area, individually controlled lighting, and built-in projector screens. With its elegant interior adorned by opulent chandeliers, the venue sets the scene for a grand celebration, comfortably hosting up to 950 guests in a banquet setting. The pillar-less space can also be partitioned into three separate function areas, each with its own foyer, and state-of-the-art audio-visual system. The Imperial Ballroom greets guests with a unique amphitheatre-style layout, embellished with a stunning oriental foyer suitable for solemnisations. Whether you prefer an intimate wedding affair or a lavish ceremony, celebrate unforgettable memories on your special day at Mandarin Orchard Singapore.	{}	\N	STANDARD	Mandarin_Orchard_Singapore_Logo_6907c912c7-1c07f61a-4966-481a-85f7-ac9a1dda69b3.png	\N	2021-04-26 20:28:17.503+07	2021-04-26 21:43:32.945+07	1	\N
31	The Outpost Hotel Sentosa	The Outpost Hotel Sentosa provides choice venues for your dream wedding – Romantic ambience, beautiful décor and the capacity for your guest list. Located on the beautiful tropical getaway of Sentosa island, The Outpost Hotel avails exciting wedding venues from a cosy solemnisation to a grand nuptial soiree. Nestled in a meticulously restored colonial building, the Revelry Hall is ideal for a wedding celebration of grandeur. For larger wedding parties, celebrate your big day at The Commune (located within the precinct), with floor-to-ceiling windows revealing the beautiful landscape during the day and illuminated grounds at night. Delectable Western and Chinese menus are available at all venues too.\n	{}	\N	STANDARD	Logo_cde5920661-ceab1965-be2c-42fd-913a-91af270dd06c.png	\N	2021-04-26 20:29:27.933+07	2021-04-26 21:47:02.675+07	1	\N
32	The Capitol Kempinski Hotel Singapore	Housed in two charming conserved architectures of Singapore’s civic and cultural district the iconic Capitol Building and Stamford House blend beautifully conserved architecture with modern touches. Singapore's premier address of Timeless Heritage promises luxury at its finest.\n\nLocated on the fourth storey of the hotel building, The Atelier features a striking pitched ceiling which adds to the charm of hosting your occasion in this iconic address. You and your guests will also be impressed by the 18-meter hand-painted Chinoiserie designer wallpaper by de Gournay that surrounds the interiors – with its vibrant, balanced, and contrasting colors to create an aura of happiness and joy.	{}	\N	STANDARD	The_Capitol_Kempinski_Hotel_Logo_80ac785392-d6e3aaba-bbda-4fc9-97ee-58cff2a98422.png	\N	2021-04-26 20:30:28.023+07	2021-04-26 21:50:36.254+07	1	\N
33	Village Hotel Changi	Tucked away in idyllic Changi Village, the hotel feels private and exclusive, while offering a handsome choice of 17 indoor and outdoor venues. Walk through intricate floral arches, toasting to love and happiness as you and your guests enjoy the sunset and sea views at our rooftop infinity pool. Then watch as we transform the Creek Pool into a fairy lit ground for a rustic chic outdoor banquet. Being so close to nature means that our venues are simply inspiring, creating the most magical setting to make that nautical or garden-themed wedding dream come true. We're also pleased to announce that the hotel has attained the Singapore Halal Certification by Majlis Ugama Islam Singapura (MUIS), for our banquet kitchen's food preparation.\n	{}	\N	STANDARD	Village_Hotel_Changi_Logo_2df9502a18-21bb2f63-7c16-49b0-81a3-b7bd9bfcf18d.png	\N	2021-04-26 20:31:01.776+07	2021-04-26 21:53:54.792+07	1	\N
\.


--
-- Data for Name: chatConversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."chatConversations" (id, "notificationBooth", "notificationUser", "notificationGuest", "createdAt", "updatedAt", "boothId", "userId") FROM stdin;
15	f	f	f	2021-02-27 16:24:31.383+07	2021-02-27 16:24:31.383+07	2	1
16	f	f	f	2021-02-27 16:24:41.113+07	2021-02-27 16:24:41.113+07	19	1
17	f	f	f	2021-02-27 16:24:50.652+07	2021-02-27 16:24:50.652+07	20	1
18	f	f	f	2021-02-27 16:24:58.604+07	2021-02-27 16:24:58.604+07	22	1
19	f	f	f	2021-02-27 16:25:16.778+07	2021-02-27 16:25:16.778+07	21	1
20	f	f	f	2021-02-27 16:25:24.745+07	2021-02-27 16:25:24.745+07	23	1
35	f	f	f	2021-03-11 22:40:49.123+07	2021-03-11 22:51:54.839+07	2	31
36	f	f	f	2021-03-16 21:06:04.472+07	2021-03-16 21:06:04.472+07	20	2
21	f	f	f	2021-03-02 14:03:00.727+07	2021-03-02 14:03:00.727+07	19	2
37	f	f	f	2021-03-16 21:08:34.671+07	2021-03-16 21:08:34.671+07	23	2
30	f	f	f	2021-03-04 00:00:35.669+07	2021-03-04 22:30:15.059+07	2	27
22	f	f	f	2021-03-03 21:31:03.581+07	2021-03-04 22:41:46.525+07	1	2
31	f	f	f	2021-03-04 21:14:07.794+07	2021-03-04 21:15:32.246+07	2	28
33	f	f	f	2021-03-04 22:54:58.339+07	2021-03-04 23:28:04.363+07	2	26
24	f	f	f	2021-03-03 23:34:25.376+07	2021-03-03 23:38:33.601+07	2	24
25	f	f	f	2021-03-03 23:50:18.363+07	2021-03-03 23:50:18.363+07	2	25
32	f	f	f	2021-03-04 22:41:09.688+07	2021-03-08 22:43:43.237+07	21	2
23	t	f	f	2021-03-03 21:33:30.321+07	2021-03-27 12:36:25.032+07	1	24
38	f	f	f	2021-04-26 22:30:31.288+07	2021-04-26 22:30:31.288+07	24	2
39	f	f	f	2021-04-26 22:30:44.874+07	2021-04-26 22:30:44.874+07	25	2
40	f	f	f	2021-04-26 22:31:21.065+07	2021-04-26 22:31:21.065+07	26	2
34	f	f	f	2021-03-08 22:26:02.901+07	2021-04-27 20:35:02.759+07	2	2
\.


--
-- Data for Name: chatMessages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."chatMessages" (id, type, message, readed, "createdAt", "updatedAt", "chatConversationId", "userId", src, size) FROM stdin;
21	MESSAGE	12321321	\N	2021-03-02 22:32:58.972+07	2021-03-02 22:32:58.972+07	15	1	\N	\N
23	MESSAGE	Hoan	\N	2021-03-02 22:33:58.41+07	2021-03-02 22:33:58.41+07	15	1	\N	\N
25	MESSAGE	Hoan 1	\N	2021-03-02 22:37:30.331+07	2021-03-02 22:37:30.331+07	15	1	\N	\N
27	MESSAGE	Hoan 3	\N	2021-03-02 22:38:45.449+07	2021-03-02 22:38:45.449+07	15	1	\N	\N
29	MESSAGE	Hoan 5	\N	2021-03-02 22:51:33.984+07	2021-03-02 22:51:33.984+07	15	1	\N	\N
30	MESSAGE	Hoan 6	\N	2021-03-02 23:02:39.101+07	2021-03-02 23:02:39.101+07	15	1	\N	\N
31	MESSAGE	Hoan 7	\N	2021-03-02 23:03:13.676+07	2021-03-02 23:03:13.676+07	15	1	\N	\N
32	MESSAGE	Hoan 8	\N	2021-03-02 23:03:36.293+07	2021-03-02 23:03:36.293+07	15	1	\N	\N
33	MESSAGE	Hoan 9	\N	2021-03-02 23:03:55.422+07	2021-03-02 23:03:55.422+07	15	1	\N	\N
34	MESSAGE	Hoan 10	\N	2021-03-02 23:04:28.397+07	2021-03-02 23:04:28.397+07	15	1	\N	\N
35	MESSAGE	Hoan 11	\N	2021-03-02 23:06:02.568+07	2021-03-02 23:06:02.568+07	15	1	\N	\N
36	MESSAGE	Hoan11	\N	2021-03-02 23:10:07.471+07	2021-03-02 23:10:07.471+07	15	1	\N	\N
37	MESSAGE	Hoan 12	\N	2021-03-02 23:12:34.863+07	2021-03-02 23:12:34.863+07	15	1	\N	\N
38	MESSAGE	Hoan 13	\N	2021-03-02 23:14:50.744+07	2021-03-02 23:14:50.744+07	15	1	\N	\N
39	MESSAGE	Hoan 14	\N	2021-03-02 23:18:27.042+07	2021-03-02 23:18:27.042+07	15	1	\N	\N
40	MESSAGE	Hoan 15	\N	2021-03-02 23:18:33.795+07	2021-03-02 23:18:33.795+07	15	1	\N	\N
41	MESSAGE	Hoan 11	\N	2021-03-02 23:28:32.111+07	2021-03-02 23:28:32.111+07	15	1	\N	\N
42	MESSAGE	Hoan 11	\N	2021-03-02 23:30:31.647+07	2021-03-02 23:30:31.647+07	15	1	\N	\N
46	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-03-02 23:42:38.254+07	2021-03-02 23:42:38.254+07	16	1	\N	\N
47	MESSAGE	Test Hoan	\N	2021-03-02 23:42:56.949+07	2021-03-02 23:42:56.949+07	16	1	\N	\N
48	MESSAGE	Hoan 12	\N	2021-03-02 23:44:17.951+07	2021-03-02 23:44:17.951+07	15	1	\N	\N
49	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-03-03 21:31:06.102+07	2021-03-03 21:31:06.102+07	22	2	\N	\N
50	MESSAGE	Hello 12345	\N	2021-03-03 21:31:56.889+07	2021-03-03 21:31:56.889+07	22	2	\N	\N
51	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-03-03 21:33:31.859+07	2021-03-03 21:33:31.859+07	23	24	\N	\N
53	MESSAGE	Hello	\N	2021-03-03 22:49:57.073+07	2021-03-03 22:49:57.073+07	23	2	\N	\N
54	MESSAGE	Hi	\N	2021-03-03 22:50:58.924+07	2021-03-03 22:50:58.924+07	23	24	\N	\N
55	MESSAGE	Hello	\N	2021-03-03 22:51:11.035+07	2021-03-03 22:51:11.035+07	23	2	\N	\N
56	MESSAGE	Xin chào	\N	2021-03-03 22:51:35.766+07	2021-03-03 22:51:35.766+07	23	24	\N	\N
57	MESSAGE	Xin chào 1	\N	2021-03-03 22:54:34.108+07	2021-03-03 22:54:34.108+07	23	24	\N	\N
58	MESSAGE	Xin chào 2	\N	2021-03-03 22:54:43.075+07	2021-03-03 22:54:43.075+07	23	24	\N	\N
59	MESSAGE	Xin chào 3	\N	2021-03-03 22:54:55.815+07	2021-03-03 22:54:55.815+07	23	24	\N	\N
60	MESSAGE	Xin chào 4	\N	2021-03-03 22:55:03.473+07	2021-03-03 22:55:03.473+07	23	24	\N	\N
61	MESSAGE	Xin chào 5	\N	2021-03-03 22:56:19.196+07	2021-03-03 22:56:19.196+07	23	2	\N	\N
62	MESSAGE	Xin chào 6	\N	2021-03-03 22:56:27.711+07	2021-03-03 22:56:27.711+07	23	24	\N	\N
63	MESSAGE	Hello	\N	2021-03-03 22:56:34.963+07	2021-03-03 22:56:34.963+07	23	24	\N	\N
64	MESSAGE	Hello	\N	2021-03-03 22:56:45.921+07	2021-03-03 22:56:45.921+07	23	24	\N	\N
65	MESSAGE	1231231	\N	2021-03-03 23:01:44.666+07	2021-03-03 23:01:44.666+07	23	24	\N	\N
66	MESSAGE	123123123211	\N	2021-03-03 23:02:43.692+07	2021-03-03 23:02:43.692+07	23	24	\N	\N
67	MESSAGE	Hello	\N	2021-03-03 23:09:05.606+07	2021-03-03 23:09:05.606+07	23	2	\N	\N
68	MESSAGE	Hello	\N	2021-03-03 23:09:21.53+07	2021-03-03 23:09:21.53+07	23	2	\N	\N
69	MESSAGE	32432	\N	2021-03-03 23:10:40.229+07	2021-03-03 23:10:40.229+07	23	24	\N	\N
70	MESSAGE	2132321	\N	2021-03-03 23:12:09.921+07	2021-03-03 23:12:09.921+07	23	24	\N	\N
71	MESSAGE	1231231	\N	2021-03-03 23:13:28.96+07	2021-03-03 23:13:28.96+07	23	24	\N	\N
72	MESSAGE	Hello	\N	2021-03-03 23:14:23.032+07	2021-03-03 23:14:23.032+07	23	24	\N	\N
73	MESSAGE	Hello	\N	2021-03-03 23:14:32.213+07	2021-03-03 23:14:32.213+07	23	24	\N	\N
74	MESSAGE	Hello	\N	2021-03-03 23:14:40.767+07	2021-03-03 23:14:40.767+07	23	24	\N	\N
75	MESSAGE	543534	\N	2021-03-03 23:16:33.146+07	2021-03-03 23:16:33.146+07	22	2	\N	\N
77	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-03-03 23:34:32.545+07	2021-03-03 23:34:32.545+07	24	24	\N	\N
78	MESSAGE	Hello	\N	2021-03-03 23:34:52.115+07	2021-03-03 23:34:52.115+07	24	2	\N	\N
1	MESSAGE	Hello\n	\N	2021-02-27 14:41:27.046+07	2021-02-27 14:41:27.046+07	\N	1	\N	\N
2	MESSAGE	Hello 123456789	\N	2021-02-28 22:51:20.965+07	2021-02-28 22:51:20.965+07	\N	1	\N	\N
3	MESSAGE	Hello 1234	\N	2021-02-28 23:05:43.551+07	2021-02-28 23:05:43.551+07	\N	1	\N	\N
4	MESSAGE	312312312312	\N	2021-02-28 23:13:30.117+07	2021-02-28 23:13:30.117+07	\N	1	\N	\N
5	MESSAGE	21312312312	\N	2021-02-28 23:14:19.558+07	2021-02-28 23:14:19.558+07	\N	1	\N	\N
6	MESSAGE	12312312	\N	2021-03-01 21:00:24.554+07	2021-03-01 21:00:24.554+07	\N	1	\N	\N
7	MESSAGE	312123rưerwerw	\N	2021-03-02 21:48:46.515+07	2021-03-02 21:48:46.515+07	\N	1	\N	\N
8	MESSAGE	321tretre	\N	2021-03-02 21:57:37.445+07	2021-03-02 21:57:37.445+07	\N	1	\N	\N
9	MESSAGE	312312312	\N	2021-03-02 21:58:39.482+07	2021-03-02 21:58:39.482+07	\N	1	\N	\N
10	MESSAGE	1312312321	\N	2021-03-02 22:01:55.016+07	2021-03-02 22:01:55.016+07	\N	1	\N	\N
11	MESSAGE	12312312	\N	2021-03-02 22:04:34.042+07	2021-03-02 22:04:34.042+07	\N	1	\N	\N
12	MESSAGE	12321321	\N	2021-03-02 22:05:49.275+07	2021-03-02 22:05:49.275+07	\N	1	\N	\N
13	MESSAGE	2312312312	\N	2021-03-02 22:06:51.818+07	2021-03-02 22:06:51.818+07	\N	1	\N	\N
14	MESSAGE	2131231	\N	2021-03-02 22:10:37.241+07	2021-03-02 22:10:37.241+07	\N	1	\N	\N
15	MESSAGE	12321321	\N	2021-03-02 22:11:43.601+07	2021-03-02 22:11:43.601+07	\N	1	\N	\N
16	MESSAGE	213213213	\N	2021-03-02 22:12:32.805+07	2021-03-02 22:12:32.805+07	\N	1	\N	\N
17	MESSAGE	213213213	\N	2021-03-02 22:13:25.405+07	2021-03-02 22:13:25.405+07	\N	1	\N	\N
18	MESSAGE	23123	\N	2021-03-02 22:15:04.977+07	2021-03-02 22:15:04.977+07	\N	1	\N	\N
19	MESSAGE	12312312	\N	2021-03-02 22:31:34.544+07	2021-03-02 22:31:34.544+07	\N	1	\N	\N
20	MESSAGE	21321321	\N	2021-03-02 22:32:27.504+07	2021-03-02 22:32:27.504+07	\N	1	\N	\N
22	MESSAGE	1231231	\N	2021-03-02 22:33:17.634+07	2021-03-02 22:33:17.634+07	\N	1	\N	\N
24	MESSAGE	Hoan	\N	2021-03-02 22:34:31.564+07	2021-03-02 22:34:31.564+07	\N	1	\N	\N
26	MESSAGE	Hoan 2	\N	2021-03-02 22:37:59.147+07	2021-03-02 22:37:59.147+07	\N	1	\N	\N
28	MESSAGE	Hoan 4	\N	2021-03-02 22:44:52.898+07	2021-03-02 22:44:52.898+07	\N	1	\N	\N
43	MESSAGE	Hoan 11	\N	2021-03-02 23:32:47.917+07	2021-03-02 23:32:47.917+07	\N	1	\N	\N
44	MESSAGE	Hoan 12	\N	2021-03-02 23:32:53.233+07	2021-03-02 23:32:53.233+07	\N	1	\N	\N
45	MESSAGE	Hoan 13	\N	2021-03-02 23:37:25.063+07	2021-03-02 23:37:25.063+07	\N	1	\N	\N
52	MESSAGE	Hello	\N	2021-03-03 22:49:38.162+07	2021-03-03 22:49:38.162+07	\N	2	\N	\N
76	MESSAGE	:hugging::yum:	\N	2021-03-03 23:30:07.073+07	2021-03-03 23:30:07.073+07	\N	2	\N	\N
140	MESSAGE	Hi ngoc	\N	2021-03-11 22:51:03.379+07	2021-03-11 22:51:03.379+07	35	2	\N	\N
141	MESSAGE	:rofl:	\N	2021-03-11 22:51:54.086+07	2021-03-11 22:51:54.086+07	35	2	\N	\N
142	MESSAGE	312312	\N	2021-03-27 11:59:21.495+07	2021-03-27 11:59:21.495+07	23	24	\N	\N
86	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-03-04 00:00:37.356+07	2021-03-04 00:00:37.356+07	30	27	\N	\N
87	MESSAGE	:joy:	\N	2021-03-04 00:01:36.614+07	2021-03-04 00:01:36.614+07	30	2	\N	\N
88	MESSAGE	Hello guy	\N	2021-03-04 20:59:48.819+07	2021-03-04 20:59:48.819+07	30	2	\N	\N
89	MESSAGE	Hello	\N	2021-03-04 21:00:09.309+07	2021-03-04 21:00:09.309+07	30	2	\N	\N
90	MESSAGE	Hello	\N	2021-03-04 21:00:27.21+07	2021-03-04 21:00:27.21+07	30	2	\N	\N
91	MESSAGE	Hello	\N	2021-03-04 21:01:55.087+07	2021-03-04 21:01:55.087+07	30	2	\N	\N
92	MESSAGE	Hello	\N	2021-03-04 21:04:47.739+07	2021-03-04 21:04:47.739+07	30	2	\N	\N
93	MESSAGE	Hello	\N	2021-03-04 21:05:07.843+07	2021-03-04 21:05:07.843+07	30	2	\N	\N
94	MESSAGE	Hello	\N	2021-03-04 21:05:26.135+07	2021-03-04 21:05:26.135+07	30	2	\N	\N
95	MESSAGE	Helo	\N	2021-03-04 21:05:41.977+07	2021-03-04 21:05:41.977+07	30	2	\N	\N
96	MESSAGE	44324324	\N	2021-03-04 21:07:02.923+07	2021-03-04 21:07:02.923+07	30	2	\N	\N
97	MESSAGE	Hello	\N	2021-03-04 21:08:00.149+07	2021-03-04 21:08:00.149+07	30	2	\N	\N
98	MESSAGE	31231231	\N	2021-03-04 21:09:55.324+07	2021-03-04 21:09:55.324+07	30	2	\N	\N
99	MESSAGE	1231232	\N	2021-03-04 21:12:16.401+07	2021-03-04 21:12:16.401+07	30	2	\N	\N
100	MESSAGE	12312	\N	2021-03-04 21:12:57.567+07	2021-03-04 21:12:57.567+07	30	2	\N	\N
101	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-03-04 21:14:09.836+07	2021-03-04 21:14:09.836+07	31	28	\N	\N
102	MESSAGE	Hello	\N	2021-03-04 21:14:22.637+07	2021-03-04 21:14:22.637+07	31	2	\N	\N
103	MESSAGE	Hello	\N	2021-03-04 21:14:34.593+07	2021-03-04 21:14:34.593+07	31	2	\N	\N
104	MESSAGE	Hello	\N	2021-03-04 21:14:42.896+07	2021-03-04 21:14:42.896+07	31	2	\N	\N
105	MESSAGE	Hello	\N	2021-03-04 21:15:17.008+07	2021-03-04 21:15:17.008+07	31	2	\N	\N
106	MESSAGE	123123213	\N	2021-03-04 22:11:47.29+07	2021-03-04 22:11:47.29+07	22	2	\N	\N
107	MESSAGE	12321	\N	2021-03-04 22:11:55.892+07	2021-03-04 22:11:55.892+07	22	2	\N	\N
108	MESSAGE	1231312	\N	2021-03-04 22:12:05.606+07	2021-03-04 22:12:05.606+07	30	2	\N	\N
109	MESSAGE	12312	\N	2021-03-04 22:16:30.124+07	2021-03-04 22:16:30.124+07	30	2	\N	\N
110	MESSAGE	21321312	\N	2021-03-04 22:18:12.078+07	2021-03-04 22:18:12.078+07	30	2	\N	\N
111	MESSAGE	312321	\N	2021-03-04 22:18:14.559+07	2021-03-04 22:18:14.559+07	30	2	\N	\N
112	MESSAGE	12321	\N	2021-03-04 22:18:57.188+07	2021-03-04 22:18:57.188+07	30	2	\N	\N
113	MESSAGE	12312312	\N	2021-03-04 22:19:55.114+07	2021-03-04 22:19:55.114+07	30	2	\N	\N
114	MESSAGE	3123	\N	2021-03-04 22:24:38.821+07	2021-03-04 22:24:38.821+07	30	2	\N	\N
115	MESSAGE	12312321	\N	2021-03-04 22:25:10.001+07	2021-03-04 22:25:10.001+07	30	2	\N	\N
116	MESSAGE	2132132	\N	2021-03-04 22:26:25.931+07	2021-03-04 22:26:25.931+07	30	2	\N	\N
117	MESSAGE	Hello	\N	2021-03-04 22:27:06.422+07	2021-03-04 22:27:06.422+07	30	2	\N	\N
118	MESSAGE	Hello	\N	2021-03-04 22:27:08.759+07	2021-03-04 22:27:08.759+07	30	2	\N	\N
119	MESSAGE	Hi	\N	2021-03-04 22:27:12.959+07	2021-03-04 22:27:12.959+07	30	27	\N	\N
120	MESSAGE	Hello	\N	2021-03-04 22:27:20.903+07	2021-03-04 22:27:20.903+07	30	27	\N	\N
121	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-03-04 22:41:13.84+07	2021-03-04 22:41:13.84+07	32	2	\N	\N
122	MESSAGE	HI	\N	2021-03-04 22:48:51.817+07	2021-03-04 22:48:51.817+07	32	26	\N	\N
123	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-03-04 23:28:00.031+07	2021-03-04 23:28:00.031+07	33	26	\N	\N
124	MESSAGE	Hello	\N	2021-03-08 22:40:46.385+07	2021-03-08 22:40:46.385+07	32	26	\N	\N
125	MESSAGE	Hi	\N	2021-03-08 22:40:52.363+07	2021-03-08 22:40:52.363+07	32	2	\N	\N
126	MESSAGE	12312	\N	2021-03-08 23:08:09.386+07	2021-03-08 23:08:09.386+07	32	2	\N	\N
129	MESSAGE	312312321	\N	2021-03-08 23:28:23.716+07	2021-03-08 23:28:23.716+07	32	2	\N	\N
131	IMAGE		\N	2021-03-08 23:38:22.121+07	2021-03-08 23:38:22.121+07	32	2	Anhword-5fe698a9-fa30-44a8-ada2-3961a39c4bee-cc71643b-c9b3-4a04-b7e4-592a77287517.png	\N
133	VIDEO		\N	2021-03-08 23:43:22.23+07	2021-03-08 23:43:22.23+07	32	2	file_example_MP4_640_3MG-014e476f-0d5d-4c20-aefb-8664e1f697c0.mp4	\N
134	FILE		\N	2021-03-08 23:49:05.405+07	2021-03-08 23:49:05.405+07	32	2	vue_api_7h_22_07_2020-1a66bb5b-ed75-413d-b7d8-f7eafbeaa693.sql	\N
135	FILE		\N	2021-03-08 23:55:31.9+07	2021-03-08 23:55:31.9+07	32	2	vue_api_20h_27_06_2020-ce8fbcde-892a-4400-99e9-78bbf0642625.sql	\N
136	FILE		\N	2021-03-08 23:56:31.652+07	2021-03-08 23:56:31.652+07	32	2	vue_api_7h_22_07_2020-72562544-5277-4cc2-bed2-dc4d439a7f3d.sql	\N
137	FILE		\N	2021-03-08 23:57:56.5+07	2021-03-08 23:57:56.5+07	32	2	vue_api_20h_27_06_2020-12c5fb4a-082d-43d4-94b3-e26e3c301f48.sql	\N
138	FILE		\N	2021-03-08 23:58:54.519+07	2021-03-08 23:58:54.519+07	32	2	vue_api_20h_27_06_2020-d527b8b1-454f-4a76-b7d4-bd0428995a5b.sql	325953
139	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-03-11 22:40:51.369+07	2021-03-11 22:40:51.369+07	35	31	\N	\N
143	MESSAGE	12312321	\N	2021-03-27 11:59:29.183+07	2021-03-27 11:59:29.183+07	23	2	\N	\N
144	MESSAGE	12312	\N	2021-03-27 11:59:33.957+07	2021-03-27 11:59:33.957+07	23	2	\N	\N
145	MESSAGE	12312312	\N	2021-03-27 11:59:37.496+07	2021-03-27 11:59:37.496+07	23	2	\N	\N
146	MESSAGE	12312	\N	2021-03-27 12:00:01.735+07	2021-03-27 12:00:01.735+07	23	2	\N	\N
147	MESSAGE	12312	\N	2021-03-27 12:00:10.615+07	2021-03-27 12:00:10.615+07	23	2	\N	\N
148	MESSAGE	213213	\N	2021-03-27 12:36:24.89+07	2021-03-27 12:36:24.89+07	23	24	\N	\N
149	MESSAGE	1232131	\N	2021-03-27 12:38:56.08+07	2021-03-27 12:38:56.08+07	23	24	\N	\N
150	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-04-26 22:29:56.178+07	2021-04-26 22:29:56.178+07	34	2	\N	\N
151	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-04-26 22:30:33.266+07	2021-04-26 22:30:33.266+07	38	2	\N	\N
152	MESSAGE	Hi, I'm interested in your services. Can I find out more?	\N	2021-04-26 22:30:47.007+07	2021-04-26 22:30:47.007+07	39	2	\N	\N
\.


--
-- Data for Name: collectors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collectors (id, collector, "createdAt", "updatedAt", "boothId", "hallId", "stageId", "userId") FROM stdin;
1	{"timesVisited":{"name":"Total Times Visited","count":1},"resourceHub":{"name":"Resource Hub Clicked","count":2}}	2021-03-25 14:30:19.769+07	2021-03-25 14:33:38.459+07	20	\N	\N	2
9	{"timeSpent":{"name":"Total Time Spent","count":317892},"timesVisited":{"name":"Total Times Visited","count":20},"resourceHub":{"name":"Resource Hub Clicked","count":4},"chatWithUs":{"name":"Live Chat Clicked","count":5}}	2021-03-25 18:19:18.746+07	2021-03-27 15:37:30.227+07	1	\N	\N	24
17	{"timesVisited":{"name":"Total Times Visited","count":3},"chatWithUs":{"name":"Live Chat Clicked","count":1},"timeSpent":{"name":"Total Time Spent","count":123048}}	2021-04-26 22:30:45.029+07	2021-04-26 22:39:57.35+07	25	\N	\N	2
8	{"timesVisited":{"name":"Total Times Visited","count":2},"booth_image_1":{"name":"Booth Image 1 (1500 x 400)","count":1},"booth_image_3":{"name":"Booth Image 3 (788 x 1800)","count":1},"booth_image_2":{"name":"Booth Image 2 (1000 x 316)","count":1},"Brochure":{"name":"Brochure","count":1},"resourceHub":{"name":"Resource Hub Clicked","count":2},"chatWithUs":{"name":"Live Chat Clicked","count":1},"onlineStore":{"name":"Online Store Clicked","count":1},"meetingUrl":{"name":"Meeting Room Clicked","count":1},"calendlyUrl":{"name":"Appointment Clicked","count":1},"video_2":{"name":"Booth Image 5 (1920x1080)","count":2},"video_1":{"name":"Booth Image 4 (1920x1080)","count":3},"timeSpent":{"name":"Total Time Spent","count":82420}}	2021-03-25 18:00:44.789+07	2021-03-25 18:01:57.308+07	19	\N	\N	2
5	{"timeSpent":{"name":"Total Time Spent","count":262647},"timesVisited":{"name":"Total Times Visited","count":7},"websiteUrl":{"name":"Online Store Clicked","count":2},"meetingUrl":{"name":"Meeting Room Clicked","count":1},"calendlyUrl":{"name":"Appointment Clicked","count":1},"chatWithUs":{"name":"Live Chat Clicked","count":1}}	2021-03-25 14:45:51.227+07	2021-04-26 22:30:00.902+07	2	\N	\N	2
16	{"timesVisited":{"name":"Total Times Visited","count":2},"chatWithUs":{"name":"Live Chat Clicked","count":1},"timeSpent":{"name":"Total Time Spent","count":7361}}	2021-04-26 22:30:31.294+07	2021-04-26 22:30:36.421+07	24	\N	\N	2
11	{"timesVisited":{"name":"Total Times Visited","count":2},"sky":{"name":"Hall background","count":1},"lcd_screen":{"name":"Centre Screen (1920 x 1080 px)","count":1},"timeSpent":{"name":"Total Time Spent","count":3827}}	2021-03-27 15:26:03.066+07	2021-03-27 15:26:43.225+07	\N	7	\N	24
12	{"timeSpent":{"name":"Total Time Spent","count":15794},"timesVisited":{"name":"Total Times Visited","count":1}}	2021-03-27 15:29:51.428+07	2021-03-27 15:29:51.509+07	19	\N	\N	24
10	{"timeSpent":{"name":"Total Time Spent","count":244364},"timesVisited":{"name":"Total Times Visited","count":18},"meetingUrl":{"name":"Meeting Room Clicked","count":1},"chatWithUs":{"name":"Live Chat Clicked","count":1},"resourceHub":{"name":"Resource Hub Clicked","count":1},"booth_image_2":{"name":"Booth Image 2 (1000 x 316 px)","count":1},"onlineStore":{"name":"Online Store Clicked","count":5}}	2021-03-26 12:08:53.146+07	2021-03-28 23:10:09.64+07	2	\N	\N	24
6	{"timesVisited":{"name":"Total Times Visited","count":6},"banner1":{"name":"Left Banner (655 x 1200 px)","count":1},"banner2":{"name":"Right  Banner (655 x 1200 px)","count":1},"lcd_screen":{"name":"Centre Screen (1920 x 1080 px)","count":1},"timeSpent":{"name":"Total Time Spent","count":52964}}	2021-03-25 15:54:37.898+07	2021-04-26 20:14:50.145+07	\N	7	\N	2
14	{"timeSpent":{"name":"Total Time Spent","count":10737},"timesVisited":{"name":"Total Times Visited","count":2}}	2021-04-26 20:14:06.064+07	2021-04-26 20:15:04.464+07	\N	5	\N	2
15	{"timeSpent":{"name":"Total Time Spent","count":15504},"timesVisited":{"name":"Total Times Visited","count":1}}	2021-04-26 21:03:22.645+07	2021-04-26 21:03:22.702+07	\N	6	\N	32
18	{"timesVisited":{"name":"Total Times Visited","count":2},"chatWithUs":{"name":"Live Chat Clicked","count":1},"timeSpent":{"name":"Total Time Spent","count":180907}}	2021-04-26 22:31:21.435+07	2021-04-26 22:34:19.261+07	26	\N	\N	2
7	{"timesVisited":{"name":"Total Times Visited","count":5},"screen":{"name":"Screen","count":3},"leftBanner":{"name":"Left Banner","count":1},"rightBanner":{"name":"Right Banner","count":1},"timeSpent":{"name":"Total Time Spent","count":125544}}	2021-03-25 17:18:45.396+07	2021-04-26 22:29:33.598+07	\N	\N	1	2
2	{"timesVisited":{"name":"Total Times Visited","count":8},"chatWithUs":{"name":"Live Chat Clicked","count":3},"agenda_image":{"name":"Agenda Banner (788 x 1800)","count":1},"timeSpent":{"name":"Total Time Spent","count":418623}}	2021-03-25 14:33:58.486+07	2021-04-26 22:37:23.744+07	1	\N	\N	2
13	{"timeSpent":{"name":"Total Time Spent","count":393299},"timesVisited":{"name":"Total Times Visited","count":9}}	2021-04-26 20:13:59.724+07	2021-04-26 22:37:43.627+07	\N	6	\N	2
\.


--
-- Data for Name: halls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.halls (id, name, status, avatar, attributes, "createdAt", "updatedAt", "sceneTemplateId", "lobbyId") FROM stdin;
7	Beauty & Fashion	ACTIVE	Frame_56category_icons_fdf995caed-239895f4-ed5a-4cd2-8b2f-ecc7cfcd01a0.png	{"sky":{"name":"Hall background","value":{"name":"jakarta","value":{"title":"Jakarta","repeat":{"x":0.05,"y":0.05},"offset":{"x":0.11,"y":0.54},"image":"/textures/jakarta.jpg"}}},"booths":{"boothNumber":30}}	2020-12-27 10:23:09.482+07	2021-04-26 20:05:33.207+07	8	\N
4	Photography & videography	ACTIVE	Frame_59category_icons_47b52185f7-2706725d-1580-47f5-926c-0989b824436a.png	{"booths":{"boothNumber":30}}	2020-12-27 10:18:02.179+07	2021-04-26 20:11:33.386+07	3	\N
1	Others services	ACTIVE	Frame_58category_icons_146733ec85-d530a23d-b3a8-40dd-b284-b70bfe914617.png	{"booths":{"boothNumber":30}}	2020-12-22 17:35:02.536+07	2021-04-26 20:13:36.839+07	3	\N
5	Flower & styling	ACTIVE	Frame_57category_icons_41fccda3cb-efb10b6e-0dcb-4bdd-8325-2db982650806.png	{"booths":{"boothNumber":30},"sky":{"name":"Hall background","value":{"name":"singapore","value":{"title":"Singapore","repeat":{"x":0.27,"y":0.48},"offset":{"x":0.32,"y":0.15},"image":"/textures/singapore.jpg"}}}}	2020-12-27 10:21:39.062+07	2021-04-26 20:14:33.532+07	3	\N
6	Venues & catering	ACTIVE	Frame_55category_icons_e3197fccb0-047f2668-72a0-43cb-bb43-d30158beadc0.png	{"booths":{"boothNumber":30}}	2020-12-27 10:22:25.546+07	2021-04-26 20:32:21.102+07	3	\N
\.


--
-- Data for Name: landings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.landings (id, title, status, description, background, button, "isAllowLogin", "disableLoginMessage", "createdAt", "updatedAt") FROM stdin;
1	Welcome to the Virtual Wedding Festival	ACTIVE	Plan your dream wedding with Virtual Wedding Festival. Discover and interact with top wedding vendors, learn tips from professionals in the wedding industry, get 8% cashback on your bookings and win attractive prizes - all from the comfort of home! Enter a fully immersive virtual wedding fair experience with us now.	Desktop_Landing_Page_3e3519f4be-aecce940-4da6-46f2-b4b7-85d3d4d15451.png	ENTER EVENT	t	Thank you for joining us at the Lunar New Year Virtual Bazaar. We hope you had as much fun as we did! Follow us on Instagram @justdelegate for more updates!	2020-04-23 07:59:28+07	2021-04-26 22:00:55.344+07
\.


--
-- Data for Name: lobbies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lobbies (id, name, status, "welcomeMsg", data, attributes, "isWelcomeMsgVisble", "welcomeMsgTitle", logo, favicon, "siteTitle", "infoBoothButton", "organizerBoothButton", "createdAt", "updatedAt", "sceneTemplateId") FROM stdin;
1	Virtual Lobby	ACTIVE	‘Tis the season to give back to our planet, and we’re on a mission to go green and reduce our waste & carbon footprint. \n\nHead over to the different **Virtual Halls** to see what our eco-friendly merchants have to offer and don't forget to check out the [**Main Stage**](ttps://main.delegateplay.com/mainstage) for showcases on sustainable living!\n\nGet **8% cashback** and special hourly **12% upsized cashback** when you transact via [Delegate PAY](https://pay.justdelegate.co/) and take part in our Hourly Lucky Draws & Grand Draw to **win prizes worth over $30,000**! \n\n---\n\n\n\n* **Pro Tip 1:** Visit the **[Info Desk](https://main.delegateplay.com/booth/5f97d010efd1995907ada57c)** to enter our hourly lucky draws and get the full agenda + directory\n\n* **Pro Tip 2:** Head over to **[Delegate's booth](https://main.delegateplay.com/booth/5f97cffcefd1995907ada57b)** to support our [giving.sg campaign](https://www.giving.sg/campaigns/zerowaste-delegate) and find resources on eco-conscious living. \n\n---\n![](https://virtualeventuet.nyc3.cdn.digitaloceanspaces.com/assets/101/Frame_1_LNYVB_Welcome_image_b4d06b90e8-a7519e43-a5c7-4219-b4dd-5766d7d73a8c.png)	\N	{"Windows_1":{"name":"Lobby background","value":{"name":"singapore","value":{"title":"Singapore","repeat":{"x":0.29,"y":0.44},"offset":{"x":0.01,"y":-0.44},"image":"/textures/singapore.jpg"}}},"organiser_banner":{"name":"Centre Screen (1920 x 1080 px)","action":{"type":"newlink","url":"https://www.youtube.com"}}}	f	Welcome to The Virtual Green Christmas Market	Site_Logo_dd4fb23c8f-aecfa532-524c-433a-8f65-b1419da829b9.png	Favicon_64x64px_4860e8a81b-9b26f783-1a74-41f1-bf95-f491f303aad5.png	The Virtual Green Christmas Market	Information Booth	Organizer Booth	2020-04-23 07:59:28+07	2021-04-26 22:01:47.993+07	2
\.


--
-- Data for Name: organizers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organizers (id, name, status, "createdAt", "updatedAt", "lobbyId", "boothId", "landingId", "infoDeskId") FROM stdin;
1	Organizer 1	ACTIVE	2021-01-09 22:35:51.338+07	2021-01-09 22:35:51.338+07	1	2	1	1
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, code, name, status, "createdAt", "updatedAt") FROM stdin;
1	listRoles	List Roles	ACTIVE	2020-12-16 15:30:19.235+07	2020-12-16 15:38:47.485+07
2	listPermissions	List Permissions	ACTIVE	2020-12-16 21:55:27.666+07	2020-12-16 21:55:27.666+07
5	detailPermission	Detail Permission	ACTIVE	2020-12-16 21:56:33.326+07	2020-12-16 21:56:33.326+07
6	assignPermission	Assign Permission	ACTIVE	2020-12-16 22:55:37.749+07	2020-12-16 22:55:37.749+07
10	detailUser	Detail User	ACTIVE	2020-12-16 22:56:57.4+07	2020-12-16 22:56:57.4+07
13	deleteRole	Delete Role	ACTIVE	2020-12-17 20:38:57.796+07	2020-12-17 20:38:57.796+07
14	deleteUser	Delete User	ACTIVE	2020-12-17 20:39:22.234+07	2020-12-17 20:39:22.234+07
15	detailRole	Delete Role	ACTIVE	2020-12-17 20:40:10.982+07	2020-12-17 20:40:10.982+07
16	deletePermission	Delete Permission	ACTIVE	2020-12-17 20:40:32.067+07	2020-12-17 20:40:32.067+07
4	updatePermission	Update Permission	ACTIVE	2020-12-16 21:56:08.11+07	2020-12-17 21:45:37.771+07
12	updateRole	Update Role	ACTIVE	2020-12-17 20:38:33.563+07	2020-12-17 21:45:51.195+07
9	updateUser	Update User	ACTIVE	2020-12-16 22:56:35.508+07	2020-12-17 21:46:02.754+07
11	createRole	Create Role	ACTIVE	2020-12-17 20:38:18.015+07	2020-12-17 21:46:43.743+07
3	createPermission	Create Permission	ACTIVE	2020-12-16 21:55:41.081+07	2020-12-17 21:46:53.001+07
8	createUser	Create User	ACTIVE	2020-12-16 22:56:20.884+07	2020-12-17 21:48:33.013+07
17	getPermissionsByRole	Get GetPermissions By Role	ACTIVE	2020-12-17 21:55:49.589+07	2020-12-17 21:55:49.589+07
18	detailLobby	Detail Lobby	ACTIVE	2020-12-19 11:43:05.426+07	2020-12-19 11:43:05.426+07
19	listSceneTemplates	List Scene Templates	ACTIVE	2020-12-21 14:51:38.587+07	2020-12-21 14:51:38.587+07
20	createHall	Create Hall	ACTIVE	2020-12-22 17:12:15.208+07	2020-12-22 17:12:15.208+07
21	listHalls	List Halls	ACTIVE	2020-12-22 17:15:15.12+07	2020-12-22 17:15:15.12+07
22	deleteHall	Delete Hall	ACTIVE	2020-12-22 17:26:07.101+07	2020-12-22 17:26:07.101+07
23	detailHall	Detail Hall	ACTIVE	2020-12-22 20:53:12.325+07	2020-12-22 20:53:12.325+07
24	updateHall	Update Hall	ACTIVE	2020-12-22 21:18:31.673+07	2020-12-22 21:18:31.673+07
25	listAssets	List Assets	ACTIVE	2020-12-24 23:24:31.16+07	2020-12-24 23:24:31.16+07
26	createAsset	Create Asset	ACTIVE	2020-12-24 23:24:44.1+07	2020-12-24 23:24:44.1+07
27	detailAsset	Detail Asset	ACTIVE	2020-12-24 23:37:47.821+07	2020-12-24 23:37:47.821+07
28	updateAsset	Update Asset	ACTIVE	2020-12-24 23:44:08.483+07	2020-12-24 23:44:08.483+07
29	deleteAsset	Delete Asset	ACTIVE	2020-12-25 00:03:38.208+07	2020-12-25 00:03:38.208+07
30	updateLobby	Update Lobby	ACTIVE	2020-12-27 10:49:18.728+07	2020-12-27 10:49:18.728+07
31	deleteStage	Delete Stage	ACTIVE	2021-01-06 23:49:38.196+07	2021-01-06 23:49:38.196+07
32	updateStage	Update Stage	ACTIVE	2021-01-06 23:50:01.838+07	2021-01-06 23:50:01.838+07
33	detailStage	Detail Stage	ACTIVE	2021-01-06 23:50:17.784+07	2021-01-06 23:50:17.784+07
34	createStage	Create Stage	ACTIVE	2021-01-06 23:50:35.919+07	2021-01-06 23:50:35.919+07
36	updateLanding	Update Landing	ACTIVE	2021-01-11 20:24:49.498+07	2021-01-11 20:24:49.498+07
37	detailLanding	Detai lLanding	ACTIVE	2021-01-11 20:25:04.325+07	2021-01-11 20:25:04.325+07
38	listBooths	List Booths 	ACTIVE	2021-01-11 23:19:21.143+07	2021-01-11 23:20:15.345+07
7	listAllUsers	List All Users	ACTIVE	2020-12-16 22:56:03.452+07	2021-01-17 21:42:45.943+07
41	listOrganizerUsers	List Organizer Users	ACTIVE	2021-01-17 22:06:27.233+07	2021-01-17 22:06:27.233+07
42	createOrganizerUser	Create Organizer User	ACTIVE	2021-01-17 23:21:22.459+07	2021-01-17 23:21:22.459+07
43	updateOrganizerUser	Update Organizer User	ACTIVE	2021-01-19 21:59:48.17+07	2021-01-19 21:59:48.17+07
44	listBoothOwnerUsers	List Booth Owner Users	ACTIVE	2021-01-19 22:51:28.995+07	2021-01-19 22:51:28.995+07
45	createBoothOwnerUser	Create Booth Owner User	ACTIVE	2021-01-19 23:07:08.758+07	2021-01-19 23:07:08.758+07
46	updateBoothOwnerUser	Update Booth Owner User	ACTIVE	2021-01-19 23:07:21.575+07	2021-01-19 23:07:21.575+07
39	detailOrganizerBooth	Detail Organizer Booth	ACTIVE	2021-01-12 23:24:06.277+07	2021-01-21 22:13:15.908+07
40	updateOrganizerBooth	Update Organizer Booth	ACTIVE	2021-01-12 23:35:46.15+07	2021-01-21 22:13:36.771+07
47	updateInfoDesk	Update Info Desk	ACTIVE	2021-01-21 22:13:55.007+07	2021-01-21 22:13:55.007+07
48	detailInfoDesk	Detail Info Desk	ACTIVE	2021-01-21 22:14:07.276+07	2021-01-21 22:14:07.276+07
49	detailOwnerBooth	Detail Owner Booth	ACTIVE	2021-01-21 22:21:55.981+07	2021-01-21 22:21:55.981+07
50	updateOwnerBooth	Update Owner Booth	ACTIVE	2021-01-21 22:22:11.483+07	2021-01-21 22:22:11.483+07
35	listStages	List Stages	ACTIVE	2021-01-06 23:50:57.075+07	2021-01-21 22:22:28.619+07
51	listStandardBooths	List Standard Booths	ACTIVE	2021-01-24 22:24:11.725+07	2021-01-24 22:24:11.725+07
52	ownerChat	Owner Chat	ACTIVE	2021-03-04 22:40:03.828+07	2021-03-04 22:40:03.828+07
53	getUserSummary	Get User Summary	ACTIVE	2021-03-09 22:27:53.273+07	2021-03-09 22:27:53.273+07
54	getVisitSummary	Get Visit Summary	ACTIVE	2021-03-11 00:08:43.996+07	2021-03-11 00:08:43.996+07
55	getVisitByTime	Get Visit By Time	ACTIVE	2021-03-13 22:05:07.236+07	2021-03-13 22:05:07.236+07
56	listResourceHubs	List Resource Hubs	ACTIVE	2021-03-14 21:49:14.457+07	2021-03-14 21:49:14.457+07
57	createResourceHub	Create Resource Hub	ACTIVE	2021-03-14 21:49:28.127+07	2021-03-14 21:49:28.127+07
58	deleteResourceHub	Delete Resource Hub	ACTIVE	2021-03-14 21:49:39.582+07	2021-03-14 21:49:39.582+07
59	detailResourceHub	Detail Resource Hub	ACTIVE	2021-03-14 21:49:53.154+07	2021-03-14 21:49:53.154+07
60	ownerResourcesHub	Owner Resources Hub	ACTIVE	2021-03-15 22:12:33.447+07	2021-03-15 22:12:33.447+07
61	infoDeskResourcesHub	Info Desk Resources Hub	ACTIVE	2021-03-15 22:13:08.968+07	2021-03-15 22:13:08.968+07
62	organizerResourcesHub	Organizer Resources Hub	ACTIVE	2021-03-15 22:13:29.928+07	2021-03-15 22:13:29.928+07
63	getAllHalls	Get All Halls	ACTIVE	2021-03-25 15:27:28.443+07	2021-03-25 15:27:28.443+07
64	hallReport	Hall Report	ACTIVE	2021-03-25 15:27:57.427+07	2021-03-25 15:27:57.427+07
65	getCollectorSummary	Get Collector Summary	ACTIVE	2021-03-25 15:53:40.592+07	2021-03-25 15:53:40.592+07
66	listCollectors	List Collectors	ACTIVE	2021-03-25 16:33:24.908+07	2021-03-25 16:33:24.908+07
67	inforDeskReport	Infor Desk Report	ACTIVE	2021-03-25 16:55:33.84+07	2021-03-25 16:55:33.84+07
68	organizerBoothReport	Organizer Booth Report	ACTIVE	2021-03-25 17:10:39.593+07	2021-03-25 17:10:39.593+07
69	stageReport	Stage Report	ACTIVE	2021-03-25 17:14:15.254+07	2021-03-25 17:14:15.254+07
70	getAllStages	Get All Stages	ACTIVE	2021-03-25 17:18:18.389+07	2021-03-25 17:18:18.389+07
\.


--
-- Data for Name: resourceHubs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."resourceHubs" (id, status, "createdAt", "updatedAt", "boothId", "assetId") FROM stdin;
1	ACTIVE	2021-03-15 21:24:19.682+07	2021-03-15 21:24:19.682+07	1	118
2	ACTIVE	2021-03-15 21:24:19.682+07	2021-03-15 21:24:19.682+07	1	117
3	ACTIVE	2021-03-15 21:40:15.809+07	2021-03-15 21:40:15.809+07	1	107
4	ACTIVE	2021-03-15 21:40:15.809+07	2021-03-15 21:40:15.809+07	1	106
5	ACTIVE	2021-03-15 21:41:09.677+07	2021-03-15 21:41:09.677+07	1	98
6	ACTIVE	2021-03-15 21:41:09.677+07	2021-03-15 21:41:09.677+07	1	99
7	ACTIVE	2021-03-15 21:41:09.677+07	2021-03-15 21:41:09.677+07	1	100
8	ACTIVE	2021-03-15 21:41:09.677+07	2021-03-15 21:41:09.677+07	1	101
9	ACTIVE	2021-03-15 21:41:09.677+07	2021-03-15 21:41:09.677+07	1	102
10	ACTIVE	2021-03-15 21:41:09.677+07	2021-03-15 21:41:09.677+07	1	103
11	ACTIVE	2021-03-15 21:41:09.677+07	2021-03-15 21:41:09.677+07	1	104
12	ACTIVE	2021-03-15 21:41:09.677+07	2021-03-15 21:41:09.677+07	1	105
19	ACTIVE	2021-03-15 22:08:06.57+07	2021-03-15 22:08:06.57+07	2	118
20	ACTIVE	2021-03-15 22:08:06.57+07	2021-03-15 22:08:06.57+07	2	117
21	ACTIVE	2021-03-15 22:08:06.57+07	2021-03-15 22:08:06.57+07	2	107
22	ACTIVE	2021-03-15 22:14:20.716+07	2021-03-15 22:14:20.716+07	19	112
23	ACTIVE	2021-03-15 22:14:20.716+07	2021-03-15 22:14:20.716+07	19	111
\.


--
-- Data for Name: rolePermissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."rolePermissions" (id, "permissionId", "roleId", "createdAt", "updatedAt") FROM stdin;
73	17	1	2020-12-17 21:57:06.252+07	2020-12-17 21:57:06.252+07
80	2	1	2020-12-17 22:55:54.023+07	2020-12-17 22:55:54.023+07
81	3	1	2020-12-17 22:55:54.023+07	2020-12-17 22:55:54.023+07
82	18	1	2020-12-19 11:43:12.148+07	2020-12-19 11:43:12.148+07
83	19	1	2020-12-21 14:51:53.939+07	2020-12-21 14:51:53.939+07
84	20	1	2020-12-22 17:12:22.863+07	2020-12-22 17:12:22.863+07
85	21	1	2020-12-22 17:15:29.731+07	2020-12-22 17:15:29.731+07
86	22	1	2020-12-22 17:26:15.83+07	2020-12-22 17:26:15.83+07
87	23	1	2020-12-22 20:53:20.041+07	2020-12-22 20:53:20.041+07
88	24	1	2020-12-22 21:18:40.403+07	2020-12-22 21:18:40.403+07
89	25	1	2020-12-24 23:24:53.02+07	2020-12-24 23:24:53.02+07
90	26	1	2020-12-24 23:24:53.02+07	2020-12-24 23:24:53.02+07
91	27	1	2020-12-24 23:37:59.03+07	2020-12-24 23:37:59.03+07
92	28	1	2020-12-24 23:44:18.519+07	2020-12-24 23:44:18.519+07
93	29	1	2020-12-25 00:03:47.136+07	2020-12-25 00:03:47.136+07
94	30	1	2020-12-27 11:03:08.586+07	2020-12-27 11:03:08.586+07
95	31	1	2021-01-07 00:03:35.203+07	2021-01-07 00:03:35.203+07
96	32	1	2021-01-07 00:03:35.203+07	2021-01-07 00:03:35.203+07
97	33	1	2021-01-07 00:03:35.203+07	2021-01-07 00:03:35.203+07
98	34	1	2021-01-07 00:03:35.203+07	2021-01-07 00:03:35.203+07
99	35	1	2021-01-07 00:03:35.203+07	2021-01-07 00:03:35.203+07
100	36	1	2021-01-11 20:25:25.777+07	2021-01-11 20:25:25.777+07
101	37	1	2021-01-11 20:25:25.777+07	2021-01-11 20:25:25.777+07
102	38	1	2021-01-11 23:19:30.239+07	2021-01-11 23:19:30.239+07
103	39	1	2021-01-12 23:24:28.177+07	2021-01-12 23:24:28.177+07
104	40	1	2021-01-12 23:35:55.313+07	2021-01-12 23:35:55.313+07
105	18	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
106	19	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
107	20	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
108	21	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
109	22	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
110	23	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
111	24	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
112	25	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
113	26	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
114	27	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
115	28	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
116	29	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
117	30	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
118	31	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
119	32	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
120	33	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
121	34	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
122	35	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
123	36	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
124	37	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
125	38	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
126	39	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
127	40	14	2021-01-17 21:33:14.951+07	2021-01-17 21:33:14.951+07
128	41	14	2021-01-17 22:07:01.662+07	2021-01-17 22:07:01.662+07
57	1	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
60	4	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
61	5	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
62	6	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
63	7	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
64	9	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
65	8	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
66	10	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
67	11	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
68	12	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
69	13	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
70	14	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
71	15	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
72	16	1	2020-12-17 20:47:52.654+07	2020-12-17 20:47:52.654+07
129	42	14	2021-01-17 23:21:41.649+07	2021-01-17 23:21:41.649+07
130	14	14	2021-01-19 21:47:00.5+07	2021-01-19 21:47:00.5+07
131	43	14	2021-01-19 22:00:06.843+07	2021-01-19 22:00:06.843+07
132	10	14	2021-01-19 22:01:03.645+07	2021-01-19 22:01:03.645+07
133	44	14	2021-01-19 22:51:37.048+07	2021-01-19 22:51:37.048+07
134	45	14	2021-01-19 23:07:47.979+07	2021-01-19 23:07:47.979+07
135	46	14	2021-01-19 23:07:47.979+07	2021-01-19 23:07:47.979+07
136	47	14	2021-01-21 22:14:19.765+07	2021-01-21 22:14:19.765+07
137	48	14	2021-01-21 22:14:19.765+07	2021-01-21 22:14:19.765+07
138	25	13	2021-01-21 22:20:42.904+07	2021-01-21 22:20:42.904+07
139	26	13	2021-01-21 22:20:42.904+07	2021-01-21 22:20:42.904+07
140	27	13	2021-01-21 22:20:42.904+07	2021-01-21 22:20:42.904+07
141	28	13	2021-01-21 22:20:42.904+07	2021-01-21 22:20:42.904+07
142	29	13	2021-01-21 22:20:42.904+07	2021-01-21 22:20:42.904+07
143	49	13	2021-01-21 22:22:46.059+07	2021-01-21 22:22:46.059+07
144	50	13	2021-01-21 22:22:46.059+07	2021-01-21 22:22:46.059+07
145	51	14	2021-01-24 22:24:40.271+07	2021-01-24 22:24:40.271+07
146	52	13	2021-03-04 22:40:15.512+07	2021-03-04 22:40:15.512+07
147	53	13	2021-03-09 22:28:09.231+07	2021-03-09 22:28:09.231+07
148	53	14	2021-03-09 22:28:17.365+07	2021-03-09 22:28:17.365+07
149	53	1	2021-03-09 22:28:53.767+07	2021-03-09 22:28:53.767+07
150	54	1	2021-03-11 00:08:53.457+07	2021-03-11 00:08:53.457+07
151	54	14	2021-03-11 00:09:01.91+07	2021-03-11 00:09:01.91+07
152	54	13	2021-03-13 22:05:24.371+07	2021-03-13 22:05:24.371+07
153	55	13	2021-03-13 22:05:24.371+07	2021-03-13 22:05:24.371+07
154	55	14	2021-03-13 22:06:28.664+07	2021-03-13 22:06:28.664+07
155	56	14	2021-03-14 21:50:08.522+07	2021-03-14 21:50:08.522+07
156	57	14	2021-03-14 21:50:08.522+07	2021-03-14 21:50:08.522+07
157	58	14	2021-03-14 21:50:08.522+07	2021-03-14 21:50:08.522+07
158	59	14	2021-03-14 21:50:08.522+07	2021-03-14 21:50:08.522+07
159	56	13	2021-03-14 21:50:17.367+07	2021-03-14 21:50:17.367+07
160	57	13	2021-03-14 21:50:17.367+07	2021-03-14 21:50:17.367+07
161	58	13	2021-03-14 21:50:17.367+07	2021-03-14 21:50:17.367+07
162	59	13	2021-03-14 21:50:17.367+07	2021-03-14 21:50:17.367+07
163	61	14	2021-03-15 22:13:51.568+07	2021-03-15 22:13:51.568+07
164	62	14	2021-03-15 22:13:51.568+07	2021-03-15 22:13:51.568+07
165	60	13	2021-03-15 22:13:59.159+07	2021-03-15 22:13:59.159+07
166	63	14	2021-03-25 15:28:11.46+07	2021-03-25 15:28:11.46+07
167	64	14	2021-03-25 15:28:11.46+07	2021-03-25 15:28:11.46+07
168	65	14	2021-03-25 15:53:54.966+07	2021-03-25 15:53:54.966+07
169	66	14	2021-03-25 16:33:33.16+07	2021-03-25 16:33:33.16+07
170	67	14	2021-03-25 16:55:43.231+07	2021-03-25 16:55:43.231+07
171	68	14	2021-03-25 17:10:47.614+07	2021-03-25 17:10:47.614+07
172	69	14	2021-03-25 17:14:22.587+07	2021-03-25 17:14:22.587+07
173	70	14	2021-03-25 17:18:25.414+07	2021-03-25 17:18:25.414+07
174	65	13	2021-03-25 17:59:55.061+07	2021-03-25 17:59:55.061+07
175	66	13	2021-03-25 17:59:55.061+07	2021-03-25 17:59:55.061+07
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, "roleAcp", name, status, "createdAt", "updatedAt") FROM stdin;
1	t	Super Admin	ACTIVE	2020-04-23 07:59:28+07	2020-05-11 14:34:42+07
14	f	Organizer	ACTIVE	2020-12-14 22:38:03.619+07	2020-12-15 15:09:31.849+07
13	f	Booth Owner	ACTIVE	2020-12-14 22:37:51.169+07	2020-12-15 22:50:30.085+07
\.


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.routes (id, name, method, "regexUri", "permissionId", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: sceneAssets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."sceneAssets" (id, key, "createdAt", "updatedAt", "hallId", "assetId", "lobbyId", "boothId", "stageId") FROM stdin;
98	booth_image_2	2021-03-12 00:39:35.56+07	2021-03-12 00:39:35.56+07	\N	114	\N	21	\N
99	booth_image_3	2021-03-12 00:39:35.56+07	2021-03-12 00:39:35.56+07	\N	115	\N	21	\N
153	lcd_screen	2021-04-26 20:13:36.807+07	2021-04-26 20:13:36.807+07	1	145	\N	\N	\N
154	banner1	2021-04-26 20:13:36.807+07	2021-04-26 20:13:36.807+07	1	139	\N	\N	\N
155	banner2	2021-04-26 20:13:36.807+07	2021-04-26 20:13:36.807+07	1	140	\N	\N	\N
156	booth_image_1	2021-04-26 20:58:02.508+07	2021-04-26 20:58:02.508+07	\N	146	\N	24	\N
157	booth_image_2	2021-04-26 20:58:02.508+07	2021-04-26 20:58:02.508+07	\N	147	\N	24	\N
158	booth_image_3	2021-04-26 20:58:02.508+07	2021-04-26 20:58:02.508+07	\N	148	\N	24	\N
159	video_1	2021-04-26 20:58:02.508+07	2021-04-26 20:58:02.508+07	\N	149	\N	24	\N
160	video_2	2021-04-26 20:58:02.508+07	2021-04-26 20:58:02.508+07	\N	150	\N	24	\N
161	booth_image_1	2021-04-26 21:17:31.927+07	2021-04-26 21:17:31.927+07	\N	151	\N	25	\N
162	booth_image_2	2021-04-26 21:17:31.927+07	2021-04-26 21:17:31.927+07	\N	152	\N	25	\N
163	booth_image_3	2021-04-26 21:17:31.927+07	2021-04-26 21:17:31.927+07	\N	153	\N	25	\N
164	video_1	2021-04-26 21:17:31.927+07	2021-04-26 21:17:31.927+07	\N	154	\N	25	\N
165	video_2	2021-04-26 21:17:31.927+07	2021-04-26 21:17:31.927+07	\N	155	\N	25	\N
166	booth_image_1	2021-04-26 21:25:40.055+07	2021-04-26 21:25:40.055+07	\N	156	\N	26	\N
167	booth_image_2	2021-04-26 21:25:40.055+07	2021-04-26 21:25:40.055+07	\N	157	\N	26	\N
168	booth_image_3	2021-04-26 21:25:40.055+07	2021-04-26 21:25:40.055+07	\N	158	\N	26	\N
169	video_1	2021-04-26 21:25:40.055+07	2021-04-26 21:25:40.055+07	\N	159	\N	26	\N
170	video_2	2021-04-26 21:25:40.055+07	2021-04-26 21:25:40.055+07	\N	160	\N	26	\N
171	booth_image_1	2021-04-26 21:31:54.941+07	2021-04-26 21:31:54.941+07	\N	161	\N	27	\N
172	booth_image_2	2021-04-26 21:31:54.941+07	2021-04-26 21:31:54.941+07	\N	162	\N	27	\N
173	video_2	2021-04-26 21:31:54.941+07	2021-04-26 21:31:54.941+07	\N	163	\N	27	\N
174	booth_image_3	2021-04-26 21:31:54.941+07	2021-04-26 21:31:54.941+07	\N	164	\N	27	\N
175	video_1	2021-04-26 21:31:54.941+07	2021-04-26 21:31:54.941+07	\N	163	\N	27	\N
176	booth_image_1	2021-04-26 21:35:29.468+07	2021-04-26 21:35:29.468+07	\N	165	\N	28	\N
177	booth_image_2	2021-04-26 21:35:29.468+07	2021-04-26 21:35:29.468+07	\N	166	\N	28	\N
178	booth_image_3	2021-04-26 21:35:29.468+07	2021-04-26 21:35:29.468+07	\N	167	\N	28	\N
179	video_1	2021-04-26 21:35:29.468+07	2021-04-26 21:35:29.468+07	\N	168	\N	28	\N
123	background	2021-03-20 00:12:12.682+07	2021-03-20 00:12:12.682+07	\N	121	\N	\N	1
126	organiser_banner	2021-04-26 19:40:33.936+07	2021-04-26 19:40:33.936+07	\N	122	1	\N	\N
127	sponsor_banner_1	2021-04-26 19:42:00.083+07	2021-04-26 19:42:00.083+07	\N	123	1	\N	\N
128	sponsor_banner_2	2021-04-26 19:42:00.083+07	2021-04-26 19:42:00.083+07	\N	124	1	\N	\N
129	mainstage_banner	2021-04-26 19:42:00.083+07	2021-04-26 19:42:00.083+07	\N	125	1	\N	\N
130	agenda_image	2021-04-26 19:45:44.046+07	2021-04-26 19:45:44.046+07	\N	126	\N	1	\N
131	brochure1	2021-04-26 19:45:44.046+07	2021-04-26 19:45:44.046+07	\N	127	\N	1	\N
132	brochure2	2021-04-26 19:45:44.046+07	2021-04-26 19:45:44.046+07	\N	128	\N	1	\N
133	help_image	2021-04-26 19:45:44.046+07	2021-04-26 19:45:44.046+07	\N	129	\N	1	\N
134	booth_image_1	2021-04-26 19:50:42.619+07	2021-04-26 19:50:42.619+07	\N	130	\N	2	\N
135	booth_image_2	2021-04-26 19:50:42.619+07	2021-04-26 19:50:42.619+07	\N	131	\N	2	\N
180	video_2	2021-04-26 21:35:29.468+07	2021-04-26 21:35:29.468+07	\N	169	\N	28	\N
137	booth_image_3	2021-04-26 19:50:42.619+07	2021-04-26 19:50:42.619+07	\N	133	\N	2	\N
181	booth_image_1	2021-04-26 21:39:20.041+07	2021-04-26 21:39:20.041+07	\N	170	\N	29	\N
139	video_1	2021-04-26 19:52:15.673+07	2021-04-26 19:52:15.673+07	\N	134	\N	2	\N
140	video_2	2021-04-26 19:52:15.673+07	2021-04-26 19:52:15.673+07	\N	132	\N	2	\N
182	booth_image_2	2021-04-26 21:39:20.041+07	2021-04-26 21:39:20.041+07	\N	171	\N	29	\N
183	booth_image_3	2021-04-26 21:39:20.041+07	2021-04-26 21:39:20.041+07	\N	172	\N	29	\N
184	video_1	2021-04-26 21:39:20.041+07	2021-04-26 21:39:20.041+07	\N	173	\N	29	\N
51	mainstage_door	2021-01-22 00:07:23.325+07	2021-01-22 00:07:23.325+07	\N	71	1	\N	\N
141	lcd_screen	2021-04-26 19:58:53.824+07	2021-04-26 19:58:53.824+07	7	135	\N	\N	\N
185	video_2	2021-04-26 21:39:20.041+07	2021-04-26 21:39:20.041+07	\N	174	\N	29	\N
186	booth_image_1	2021-04-26 21:43:32.757+07	2021-04-26 21:43:32.757+07	\N	175	\N	30	\N
187	booth_image_2	2021-04-26 21:43:32.757+07	2021-04-26 21:43:32.757+07	\N	176	\N	30	\N
188	booth_image_3	2021-04-26 21:43:32.757+07	2021-04-26 21:43:32.757+07	\N	177	\N	30	\N
189	video_1	2021-04-26 21:43:32.757+07	2021-04-26 21:43:32.757+07	\N	178	\N	30	\N
190	video_2	2021-04-26 21:43:32.757+07	2021-04-26 21:43:32.757+07	\N	179	\N	30	\N
191	booth_image_1	2021-04-26 21:47:02.644+07	2021-04-26 21:47:02.644+07	\N	180	\N	31	\N
192	booth_image_2	2021-04-26 21:47:02.644+07	2021-04-26 21:47:02.644+07	\N	181	\N	31	\N
193	video_2	2021-04-26 21:47:02.644+07	2021-04-26 21:47:02.644+07	\N	182	\N	31	\N
194	booth_image_3	2021-04-26 21:47:02.644+07	2021-04-26 21:47:02.644+07	\N	183	\N	31	\N
195	video_1	2021-04-26 21:47:02.644+07	2021-04-26 21:47:02.644+07	\N	184	\N	31	\N
196	booth_image_1	2021-04-26 21:50:36.198+07	2021-04-26 21:50:36.198+07	\N	185	\N	32	\N
197	booth_image_2	2021-04-26 21:50:36.198+07	2021-04-26 21:50:36.198+07	\N	186	\N	32	\N
198	booth_image_3	2021-04-26 21:50:36.198+07	2021-04-26 21:50:36.198+07	\N	187	\N	32	\N
199	video_1	2021-04-26 21:50:36.198+07	2021-04-26 21:50:36.198+07	\N	188	\N	32	\N
200	video_2	2021-04-26 21:50:36.198+07	2021-04-26 21:50:36.198+07	\N	189	\N	32	\N
201	booth_image_1	2021-04-26 21:53:54.774+07	2021-04-26 21:53:54.774+07	\N	190	\N	33	\N
202	booth_image_2	2021-04-26 21:53:54.774+07	2021-04-26 21:53:54.774+07	\N	191	\N	33	\N
203	booth_image_3	2021-04-26 21:53:54.774+07	2021-04-26 21:53:54.774+07	\N	192	\N	33	\N
204	video_1	2021-04-26 21:53:54.774+07	2021-04-26 21:53:54.774+07	\N	193	\N	33	\N
205	video_2	2021-04-26 21:53:54.774+07	2021-04-26 21:53:54.774+07	\N	194	\N	33	\N
206	bannerRightUrl	2021-04-26 21:58:32.651+07	2021-04-26 21:58:32.651+07	\N	197	\N	\N	1
207	bannerLeftUrl	2021-04-26 21:58:32.651+07	2021-04-26 21:58:32.651+07	\N	196	\N	\N	1
208	centreScreenUrl	2021-04-26 21:58:32.651+07	2021-04-26 21:58:32.651+07	\N	195	\N	\N	1
209	centreScreenUrl	2021-04-26 21:58:49.041+07	2021-04-26 21:58:49.041+07	\N	195	\N	\N	1
210	centreScreenUrl	2021-04-26 21:59:01.342+07	2021-04-26 21:59:01.342+07	\N	195	\N	\N	1
142	banner1	2021-04-26 19:58:53.824+07	2021-04-26 19:58:53.824+07	7	136	\N	\N	\N
143	banner2	2021-04-26 19:58:53.824+07	2021-04-26 19:58:53.824+07	7	137	\N	\N	\N
83	video_1	2021-02-12 00:16:42.004+07	2021-02-12 00:16:42.004+07	\N	109	\N	20	\N
84	booth_image_3	2021-02-18 22:13:11.659+07	2021-02-18 22:13:11.659+07	\N	110	\N	20	\N
85	booth_image_1	2021-02-20 22:42:20.486+07	2021-02-20 22:42:20.486+07	\N	111	\N	19	\N
86	booth_image_2	2021-02-20 22:43:00.937+07	2021-02-20 22:43:00.937+07	\N	111	\N	19	\N
87	booth_image_3	2021-02-20 22:43:00.937+07	2021-02-20 22:43:00.937+07	\N	112	\N	19	\N
88	booth_image_1	2021-02-20 22:45:10.104+07	2021-02-20 22:45:10.104+07	\N	113	\N	20	\N
89	booth_image_2	2021-02-20 22:45:10.104+07	2021-02-20 22:45:10.104+07	\N	113	\N	20	\N
144	lcd_screen	2021-04-26 20:08:48.045+07	2021-04-26 20:08:48.045+07	5	141	\N	\N	\N
145	banner1	2021-04-26 20:08:48.045+07	2021-04-26 20:08:48.045+07	5	142	\N	\N	\N
146	banner2	2021-04-26 20:08:48.045+07	2021-04-26 20:08:48.045+07	5	143	\N	\N	\N
147	lcd_screen	2021-04-26 20:10:12.283+07	2021-04-26 20:10:12.283+07	6	138	\N	\N	\N
94	booth_image_1	2021-03-12 00:37:07.243+07	2021-03-12 00:37:07.243+07	\N	114	\N	21	\N
148	banner1	2021-04-26 20:10:12.283+07	2021-04-26 20:10:12.283+07	6	139	\N	\N	\N
149	banner2	2021-04-26 20:10:12.283+07	2021-04-26 20:10:12.283+07	6	140	\N	\N	\N
150	lcd_screen	2021-04-26 20:11:33.343+07	2021-04-26 20:11:33.343+07	4	144	\N	\N	\N
151	banner1	2021-04-26 20:11:33.343+07	2021-04-26 20:11:33.343+07	4	139	\N	\N	\N
152	banner2	2021-04-26 20:11:33.343+07	2021-04-26 20:11:33.343+07	4	140	\N	\N	\N
\.


--
-- Data for Name: sceneModels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."sceneModels" (id, key, index, "createdAt", "updatedAt", "lobbyId", "hallId", "boothId", "stageId") FROM stdin;
104	stages	0	2021-01-10 00:28:29.395+07	2021-01-10 00:28:29.395+07	1	\N	\N	1
118	booths	0	2021-01-22 00:08:40.907+07	2021-01-22 00:08:40.907+07	1	\N	1	\N
119	booths	1	2021-01-22 00:08:40.907+07	2021-01-22 00:08:40.907+07	1	\N	2	\N
125	halls	4	2021-04-26 19:56:14.305+07	2021-04-26 19:56:14.305+07	1	1	\N	\N
126	halls	3	2021-04-26 19:56:14.305+07	2021-04-26 19:56:14.305+07	1	4	\N	\N
127	halls	2	2021-04-26 19:56:14.305+07	2021-04-26 19:56:14.305+07	1	5	\N	\N
128	halls	0	2021-04-26 19:56:14.305+07	2021-04-26 19:56:14.305+07	1	7	\N	\N
129	halls	1	2021-04-26 19:56:14.305+07	2021-04-26 19:56:14.305+07	1	6	\N	\N
130	booths	0	2021-04-26 20:32:21.044+07	2021-04-26 20:32:21.044+07	\N	6	24	\N
131	booths	1	2021-04-26 20:32:21.044+07	2021-04-26 20:32:21.044+07	\N	6	25	\N
132	booths	2	2021-04-26 20:32:21.044+07	2021-04-26 20:32:21.044+07	\N	6	26	\N
133	booths	3	2021-04-26 20:32:21.044+07	2021-04-26 20:32:21.044+07	\N	6	27	\N
134	booths	4	2021-04-26 20:32:21.044+07	2021-04-26 20:32:21.044+07	\N	6	28	\N
135	booths	5	2021-04-26 20:32:21.044+07	2021-04-26 20:32:21.044+07	\N	6	29	\N
136	booths	6	2021-04-26 20:32:21.044+07	2021-04-26 20:32:21.044+07	\N	6	30	\N
137	booths	7	2021-04-26 20:32:21.044+07	2021-04-26 20:32:21.044+07	\N	6	31	\N
138	booths	8	2021-04-26 20:32:21.044+07	2021-04-26 20:32:21.044+07	\N	6	32	\N
139	booths	9	2021-04-26 20:32:21.044+07	2021-04-26 20:32:21.044+07	\N	6	33	\N
\.


--
-- Data for Name: sceneTemplates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."sceneTemplates" (id, name, description, path, status, "sceneType", attributes, thumb, data, "createdAt", "updatedAt") FROM stdin;
4	Booth template info	\N	booth-info.glb	ACTIVE	INFORMATION_BOOTH	{\n  "help_image": {\n    "key": "help_image",\n    "name": "Help Centre Image (1920 x 1080)",\n    "desc": "Help Centre on TV Screen",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "agenda_image": {\n    "key": "agenda_image",\n    "name": "Agenda Banner (788 x 1800)",\n    "desc": "Event Agenda Banner : 788 px x 1800 px",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "brochure1": {\n    "key": "brochure1",\n    "name": "Brochure Left (200x270)",\n    "desc": "Brochure Left",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "brochure2": {\n    "key": "brochure2",\n    "name": "Brochure Right (200x270)",\n    "desc": "Brochure Right",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "mesh_0": {\n    "key": "claudia",\n    "type": "gltf",\n    "assetType": "external",\n    "value": {\n      "src": "/models/bm/bm.glb",\n      "position": [\n        0,\n        0,\n        0\n      ],\n      "scale": [\n        1,\n        1,\n        1\n      ]\n    },\n    "action": {\n      "type": "open_chat",\n      "data": {}\n    }\n  }\n}	\N	{\n  "camera": {\n    "position": {\n      "x": 0.05449410708043086,\n      "y": 1.2698321193443518,\n      "z": 5.5\n    },\n    "orbitTarget": {\n      "x": 0,\n      "y": 1.2300202805156988,\n      "z": 0\n    },\n    "fov": 35\n  },\n  "renderer": {\n    "toneMapping": "ACESFilmicToneMapping",\n    "toneMappingExposure": 1,\n    "shadowMapEnabled": true,\n    "shadowMap": true\n  },\n  "env": {\n    "hallIntensity": 1.5,\n    "boothIntensity": 3\n  }\n}	2020-04-23 07:59:28+07	2020-04-23 07:59:28+07
1	Booth template 1	\N	booth.glb	ACTIVE	BOOTH	{\n  "booth_image_1": {\n    "key": "booth_image_1",\n    "name": "Booth Image 1 (1500 x 400)",\n    "desc": "Banner for area 1",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "booth_image_2": {\n    "key": "booth_image_2",\n    "name": "Booth Image 2 (1000 x 316)",\n    "desc": "Banner for area 2",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "booth_image_3": {\n    "key": "booth_image_3",\n    "name": "Booth Image 3 (788 x 1800)",\n    "desc": "Banner for area 3",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "video_1": {\n    "key": "video_1",\n    "name": "Booth Image 4 (1920x1080)",\n    "desc": "Video 1 description",\n    "type": "mesh",\n    "assetType": "video",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {\n        "autoPlay": true\n      }\n    }\n  },\n  "video_2": {\n    "key": "video_2",\n    "name": "Booth Image 5 (1920x1080)",\n    "desc": "Video 2 description",\n    "type": "mesh",\n    "assetType": "video",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {\n        "autoPlay": true\n      }\n    }\n  },\n  "pCube2": {\n    "key": "pCube2",\n    "name": "Booth color",\n    "type": "material",\n    "assetType": "color",\n    "value": {\n      "name": "medium brown",\n      "value": "#8E7575"\n    },\n    "presetValue": [\n      {\n        "name": "white",\n        "value": "#FBFBFA"\n      },\n      {\n        "name": "light beige",\n        "value": "#CEC2B3"\n      },\n      {\n        "name": "medium brown",\n        "value": "#8E7575"\n      },\n      {\n        "name": "dark brown",\n        "value": "#6C4D3A"\n      },\n      {\n        "name": "light yellow",\n        "value": "#FFF5CA"\n      },\n      {\n        "name": "maroon",\n        "value": "#914141"\n      }\n    ]\n  },\n  "Brochure": {\n    "key": "Brochure",\n    "name": "Brochure",\n    "type": "mesh",\n    "assetType": "object",\n    "value": false,\n    "action": {\n      "type": "open_resource",\n      "data": {}\n    }\n  },\n  "claudia": {\n    "key": "claudia",\n    "type": "gltf",\n    "assetType": "external",\n    "value": {\n      "src": "/models/claudia/claudia.glb",\n      "position": [\n        0,\n        0.019,\n        2\n      ],\n      "scale": [\n        0.88,\n        0.88,\n        0.88\n      ]\n    },\n    "action": {\n      "type": "open_chat",\n      "data": {}\n    }\n  }\n}	booth-preview.png	{\n  "camera": {\n    "position": {\n      "x": 0,\n      "y": 2.050542194787685,\n      "z": 9.476249999999999\n    },\n    "orbitTarget": {\n      "x": 0,\n      "y": 1.7,\n      "z": 0\n    },\n    "fov": 35\n  },\n  "renderer": {\n    "toneMapping": "ACESFilmicToneMapping",\n    "toneMappingExposure": 1,\n    "shadowMapEnabled": true,\n    "shadowMap": true\n  },\n  "env": {\n    "hallIntensity": 0.8,\n    "boothIntensity": 2\n  }\n}	2020-04-23 07:59:28+07	2020-04-23 07:59:28+07
2	Lobby template	\N	lobby.glb	ACTIVE	LOBBY	{\n  "organiser_banner": {\n    "key": "organiser_banner",\n    "name": "Centre Screen (1920 x 1080 px)",\n    "desc": "Banner for Organiser",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "sponsor_banner_1": {\n    "key": "sponsor_banner_1",\n    "name": "Left Screen (1920 x 1080 px)",\n    "desc": "Banner for Sponsor 1",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "sponsor_banner_2": {\n    "key": "sponsor_banner_2",\n    "name": "Right Screen (1920 x 1080 px)",\n    "desc": "Banner for Sponsor 2",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "mainstage_banner": {\n    "key": "mainstage_banner",\n    "name": "Main Stage Banner (785 x 1500 px)",\n    "desc": "Event Agenda Image (Main Stage Door)",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    },\n    "extra": {\n      "label": "Main Stage"\n    }\n  },\n  "mw": {\n    "key": "mw",\n    "type": "gltf",\n    "assetType": "external",\n    "value": {\n      "src": "/models/man-walking/scene.gltf",\n      "position": [\n        -7,\n        0.274,\n        10.223\n      ],\n      "rotation": [\n        0,\n        89.5,\n        0\n      ],\n      "scale": [\n        0.01,\n        0.01,\n        0.01\n      ],\n      "path": {\n        "x": [\n          -7.5,\n          9,\n          0.01\n        ],\n        "r": {\n          "y": 89.5\n        }\n      }\n    }\n  },\n  "shopia": {\n    "key": "shopia",\n    "type": "gltf",\n    "assetType": "external",\n    "value": {\n      "src": "/models/sophia/sophia.gltf",\n      "position": [\n        5.141,\n        4.765,\n        3.977\n      ],\n      "rotation": [\n        0,\n        0,\n        0\n      ],\n      "scale": [\n        0.011,\n        0.011,\n        0.011\n      ]\n    }\n  },\n  "Windows_1": {\n    "name": "Lobby background",\n    "key": "Windows_1",\n    "type": "sky",\n    "assetType": "texture_options",\n    "value": {\n      "name": "singapore"\n    },\n    "presetValue": [\n      {\n        "name": "singapore",\n        "value": {\n          "title": "Singapore",\n          "repeat": {\n            "x": 0.29,\n            "y": 0.44\n          },\n          "offset": {\n            "x": 0.01,\n            "y": -0.44\n          },\n          "image": "/textures/singapore.jpg"\n        }\n      },\n      {\n        "name": "malaysia",\n        "value": {\n          "title": "Malaysia",\n          "repeat": {\n            "x": 0.28,\n            "y": 1.008\n          },\n          "offset": {\n            "x": 0.4,\n            "y": 0\n          },\n          "image": "/textures/malaysia.jpg"\n        }\n      },\n      {\n        "name": "jakarta",\n        "value": {\n          "title": "Jakarta",\n          "repeat": {\n            "x": 0.19,\n            "y": 0.45\n          },\n          "offset": {\n            "x": -0.31,\n            "y": -0.39\n          },\n          "image": "/textures/jakarta.jpg"\n        }\n      }\n    ]\n  },\n  "wm": {\n    "key": "wm",\n    "type": "gltf",\n    "assetType": "external",\n    "value": {\n      "src": "/models/woman_walking/wm.gltf",\n      "position": [\n        6,\n        0.237,\n        19.7\n      ],\n      "rotation": [\n        -89.5,\n        0,\n        90\n      ],\n      "scale": [\n        0.001,\n        0.001,\n        0.001\n      ]\n    }\n  },\n  "stages": {\n    "key": "stages",\n    "type": "group_scene",\n    "assetType": "group_scene",\n    "group_name": "MainStage Door",\n    "model": "stage",\n    "modelIdKey": "stageId",\n    "items": [\n      {\n        "key": "mainstage_door",\n        "name": "Main Stage",\n        "thumbnail": false,\n        "value": false\n      }\n    ],\n    "action": {\n      "type": "go-scene"\n    }\n  },\n  "booths": {\n    "key": "booths",\n    "type": "group_scene",\n    "assetType": "group_scene",\n    "group_name": "Booths Placements",\n    "model": "booth",\n    "modelIdKey": "boothId",\n    "items": [\n      {\n        "thumbnail": false,\n        "pos": [\n          -7.263,\n          0.288,\n          17.246\n        ],\n        "name": "Information Booth",\n        "template": "/booth-info-low.glb",\n        "value": false\n      },\n      {\n        "thumbnail": false,\n        "pos": [\n           8.839,\n          0.254,\n          15.054\n        ],\n        "name": "Organiser Booth",\n        "template": "/booth-01-low.glb",\n        "value": false\n      }\n    ],\n    "action": {\n      "type": "go-scene"\n    }\n  },\n  "halls": {\n    "key": "halls",\n    "type": "group_scene",\n    "assetType": "group_scene",\n    "group_name": "Halls Placements",\n    "model": "hall",\n    "modelIdKey": "hallId",\n    "items": [\n      {\n        "key": "door1",\n        "name": "Hall 1",\n        "thumbnail": false,\n        "value": false\n      },\n      {\n        "key": "door2",\n        "name": "Hall 2",\n        "thumbnail": false,\n        "value": false\n      },\n      {\n        "key": "door3",\n        "name": "Hall 3",\n        "thumbnail": false,\n        "value": false\n      },\n      {\n        "key": "door4",\n        "name": "Hall 4",\n        "thumbnail": false,\n        "value": false\n      },\n      {\n        "key": "door5",\n        "name": "Hall 5",\n        "thumbnail": false,\n        "value": false\n      }\n    ],\n    "action": {\n      "type": "go-scene"\n    }\n  }\n}	\N	{\n  "camera": {\n    "position": {\n      "x": 0,\n      "y": 5.927769937717443,\n      "z": 34.98236400613285\n    },\n    "orbitTarget": {\n      "x": 0,\n      "y": 3.083360437649728,\n      "z": 0\n    },\n    "fov": 35\n  },\n  "renderer": {\n    "toneMapping": "ACESFilmicToneMapping",\n    "toneMappingExposure": 1,\n    "shadowMapEnabled": true,\n    "shadowMap": true\n  },\n  "env": {\n    "lobbyIntensity": 0.8\n  }\n}	2020-04-23 07:59:28+07	2020-04-23 07:59:28+07
3	Hall template 1	\N	hall.glb	ACTIVE	HALL	{\n  "lcd_screen": {\n    "key": "lcd_screen",\n    "name": "Centre Screen (1920 x 1080 px)",\n    "desc": "Main LCD",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "banner1": {\n    "key": "banner1",\n    "name": "Left Banner (655 x 1200 px)",\n    "desc": "Banner Left",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "banner2": {\n    "key": "banner2",\n    "name": "Right  Banner (655 x 1200 px)",\n    "desc": "Banner Right",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "sky": {\n    "key": "sky",\n    "type": "sky",\n    "assetType": "texture_options",\n    "name": "Hall background",\n    "value": {\n      "name": "malaysia"\n    },\n    "presetValue": [\n      {\n        "name": "singapore",\n        "value": {\n          "title": "Singapore",\n          "repeat": {\n            "x": 0.27,\n            "y": 0.48\n          },\n          "offset": {\n            "x": 0.32,\n            "y": 0.15\n          },\n          "image": "/textures/singapore.jpg"\n        }\n      },\n      {\n        "name": "malaysia",\n        "value": {\n          "title": "Malaysia",\n          "repeat": {\n            "x": 0.28,\n            "y": 1.008\n          },\n          "offset": {\n            "x": 0.4,\n            "y": 0\n          },\n          "image": "/textures/malaysia.jpg"\n        }\n      },\n      {\n        "name": "jakarta",\n        "value": {\n          "title": "Jakarta",\n          "repeat": {\n            "x": 0.24,\n            "y": 0.5\n          },\n          "offset": {\n            "x": 0.47,\n            "y": 0.08\n          },\n          "image": "/textures/jakarta.jpg"\n        }\n      }\n    ]\n  },\n  "booths": {\n    "key": "booths",\n    "type": "group_scene",\n    "assetType": "group_scene",\n    "group_name": "Booths Placements",\n    "model": "booth",\n    "boothNumber": 30,\n    "items": [],\n    "modelIdKey": "boothId",\n    "action": {\n      "type": "go-scene"\n    }\n  },\n  "hallbooth": {\n    "key": "hallbooth",\n    "type": "sky",\n    "assetType": "texture_mainsite_options",\n    "value": {\n      "name": "singapore",\n      "model": "/hall/hallStandard1/hall.glb"\n    },\n    "presetValue": [\n      {\n        "name": "singapore",\n        "value": {\n          "title": "Singapore",\n          "repeat": {\n            "x": 0.24,\n            "y": 0.47\n          },\n          "offset": {\n            "x": 0.46,\n            "y": 0.57\n          },\n          "image": "/textures/singapore.jpg"\n        }\n      },\n      {\n        "name": "malaysia",\n        "value": {\n          "title": "Malaysia",\n          "repeat": {\n            "x": 0.24,\n            "y": 0.47\n          },\n          "offset": {\n            "x": 0.46,\n            "y": 0.57\n          },\n          "image": "/textures/malaysia.jpg"\n        }\n      },\n      {\n        "name": "jakarta",\n        "value": {\n          "title": "Jakarta",\n          "repeat": {\n            "x": 0.24,\n            "y": 0.47\n          },\n          "offset": {\n            "x": 0.46,\n            "y": 0.57\n          },\n          "image": "/textures/jakarta.jpg"\n        }\n      }\n    ]\n  }\n}	\N	{\n  "camera": {\n    "position": {\n      "x": 0,\n      "y": 5.5,\n      "z": 35\n    },\n    "orbitTarget": {\n      "x": 0,\n      "y": 5,\n      "z": 0\n    },\n    "fov": 35\n  },\n  "renderer": {\n    "toneMapping": "ACESFilmicToneMapping",\n    "toneMappingExposure": 1,\n    "shadowMapEnabled": true,\n    "shadowMap": true\n  },\n  "env": {\n    "modelIntensity": 0.8\n  }\n}	2020-04-23 07:59:28+07	2020-04-23 07:59:28+07
7	Booth template 4	\N	booth.glb	ACTIVE	BOOTH	{\n  "booth_image_1": {\n    "key": "booth_image_1",\n    "name": "Booth Image 1 (1500 x 400 px)",\n    "desc": "Banner for area 1",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "booth_image_2": {\n    "key": "booth_image_2",\n    "name": "Booth Image 2 (1000 x 316 px)",\n    "desc": "Banner for area 2",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "booth_image_3": {\n    "key": "booth_image_3",\n    "name": "Booth Image 3 (788 x 1800 px)",\n    "desc": "Banner for area 3",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "video_1": {\n    "key": "video_1",\n    "name": "Booth Image 4 (1920x1080 px)",\n    "desc": "Video 1 description",\n    "type": "mesh",\n    "assetType": "video",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {\n        "autoPlay": true\n      }\n    }\n  },\n  "video_2": {\n    "key": "video_2",\n    "name": "Booth Image 5 (1920 x 1080 px)",\n    "desc": "Video 2 description",\n    "type": "mesh",\n    "assetType": "video",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {\n        "autoPlay": true\n      }\n    }\n  },\n  "pCube2": {\n    "key": "pCube2",\n    "name": "Booth Colour",\n    "type": "material",\n    "assetType": "color",\n    "value": {\n      "name": "green",\n      "value": "#396B4A"\n    },\n    "presetValue": [\n      {\n        "name": "orange",\n        "value": "#D98243"\n      },\n      {\n        "name": "yellow",\n        "value": "#C9B44A"\n      },\n      {\n        "name": "white",\n        "value": "#ffffff"\n      },\n      {\n        "name": "red",\n        "value": "#B53524"\n      },\n      {\n        "name": "blue",\n        "value": "#005A8C"\n      },\n      {\n        "name": "green",\n        "value": "#396B4A"\n      }\n    ]\n  },\n  "Brochure": {\n    "key": "Brochure",\n    "name": "Brochure",\n    "type": "mesh",\n    "assetType": "object",\n    "value": false,\n    "action": {\n      "type": "open_resource",\n      "data": {}\n    }\n  },\n  "claudia": {\n    "key": "claudia",\n    "type": "gltf",\n    "assetType": "external",\n    "value": {\n      "src": "/models/claudia/claudia.glb",\n      "position": [\n        -2,\n        0.1,\n        0.5\n      ],\n      "scale": [\n        0.88,\n        0.88,\n        0.88\n      ]\n    },\n    "action": {\n      "type": "open_chat",\n      "data": {}\n    }\n  }\n}	booth-preview.png	{\n  "camera": {\n    "position": {\n      "x": 0,\n      "y": 2.5,\n      "z": 10.476249999999999\n    },\n    "orbitTarget": {\n      "x": 0,\n      "y": 2.7,\n      "z": 0\n    },\n    "fov": 35\n  },\n  "renderer": {\n    "toneMapping": "ACESFilmicToneMapping",\n    "toneMappingExposure": 1,\n    "shadowMapEnabled": true,\n    "shadowMap": true\n  },\n  "env": {\n    "hallIntensity": 0.8,\n    "boothIntensity": 2\n  },\n  "subTemplate": "/newbooth-3-low.glb"\n}	2020-04-23 07:59:28+07	2020-04-23 07:59:28+07
5	Booth template 2	\N	booth.glb	ACTIVE	BOOTH	{\n  "booth_image_1": {\n    "key": "booth_image_1",\n    "name": "Booth Image 1 (1500 x 400 px)",\n    "desc": "Banner for area 1",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "booth_image_2": {\n    "key": "booth_image_2",\n    "name": "Booth Image 2 (1000 x 316 px)",\n    "desc": "Banner for area 2",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "booth_image_3": {\n    "key": "booth_image_3",\n    "name": "Booth Image 3 (788 x 1800 px)",\n    "desc": "Banner for area 3",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "video_1": {\n    "key": "video_1",\n    "name": "Booth Image 4 (1920x1080 px)",\n    "desc": "Video 1 description",\n    "type": "mesh",\n    "assetType": "video",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {\n        "autoPlay": true\n      }\n    }\n  },\n  "video_2": {\n    "key": "video_2",\n    "name": "Booth Image 5 (1920 x 1080 px)",\n    "desc": "Video 2 description",\n    "type": "mesh",\n    "assetType": "video",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {\n        "autoPlay": true\n      }\n    }\n  },\n  "pCube2": {\n    "key": "pCube2",\n    "name": "Booth Colour",\n    "type": "material",\n    "assetType": "color",\n    "value": {\n      "name": "red",\n      "value": "#BD2A2A"\n    },\n    "presetValue": [\n      {\n        "name": "light blue",\n        "value": "#A2D7F4"\n      },\n      {\n        "name": "dark blue",\n        "value": "#005A8C"\n      },\n      {\n        "name": "green",\n        "value": "#396B4A"\n      },\n      {\n        "name": "red",\n        "value": "#BD2A2A"\n      },\n      {\n        "name": "blackish grey",\n        "value": "#312F2F"\n      },\n      {\n        "name": "orange",\n        "value": "#D98243"\n      }\n    ]\n  },\n  "Brochure": {\n    "key": "Brochure",\n    "name": "Brochure",\n    "type": "mesh",\n    "assetType": "object",\n    "value": false,\n    "action": {\n      "type": "open_resource",\n      "data": {}\n    }\n  },\n  "claudia": {\n    "key": "claudia",\n    "type": "gltf",\n    "assetType": "external",\n    "value": {\n      "src": "/models/claudia/claudia.glb",\n      "position": [\n        2.3,\n        0.2,\n        0.95\n      ],\n      "scale": [\n        0.88,\n        0.88,\n        0.88\n      ]\n    },\n    "action": {\n      "type": "open_chat",\n      "data": {}\n    }\n  }\n}	booth-preview.png	{\n  "camera": {\n    "position": {\n      "x": 0,\n      "y": 2.5,\n      "z": 12.67625\n    },\n    "orbitTarget": {\n      "x": 0,\n      "y": 2.2,\n      "z": 0\n    },\n    "fov": 35\n  },\n  "renderer": {\n    "toneMapping": "ACESFilmicToneMapping",\n    "toneMappingExposure": 1,\n    "shadowMapEnabled": true,\n    "shadowMap": true\n  },\n  "env": {\n    "hallIntensity": 0.8,\n    "boothIntensity": 2\n  },\n  "subTemplate": "/newbooth-1-low.glb"\n}	2020-04-23 07:59:28+07	2020-04-23 07:59:28+07
6	Booth template 3	\N	booth.glb	ACTIVE	BOOTH	{\n  "booth_image_1": {\n    "key": "booth_image_1",\n    "name": "Booth Image 1 (1500 x 400 px)",\n    "desc": "Banner for area 1",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "booth_image_2": {\n    "key": "booth_image_2",\n    "name": "Booth Image 2 (1000 x 316 px)",\n    "desc": "Banner for area 2",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "booth_image_3": {\n    "key": "booth_image_3",\n    "name": "Booth Image 3 (788 x 1800 px)",\n    "desc": "Banner for area 3",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "video_1": {\n    "key": "video_1",\n    "name": "Booth Image 4 (1920x1080 px)",\n    "desc": "Video 1 description",\n    "type": "mesh",\n    "assetType": "video",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {\n        "autoPlay": true\n      }\n    }\n  },\n  "video_2": {\n    "key": "video_2",\n    "name": "Booth Image 5 (1920 x 1080 px)",\n    "desc": "Video 2 description",\n    "type": "mesh",\n    "assetType": "video",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {\n        "autoPlay": true\n      }\n    }\n  },\n  "pCube2": {\n    "key": "pCube2",\n    "name": "Booth Colour",\n    "type": "material",\n    "assetType": "color",\n    "value": {\n      "name": "blue",\n      "value": "#005A8C"\n    },\n    "presetValue": [\n      {\n        "name": "green",\n        "value": "#617A6A"\n      },\n      {\n        "name": "blue",\n        "value": "#005A8C"\n      },\n      {\n        "name": "purple",\n        "value": "#584472"\n      },\n      {\n        "name": "orange",\n        "value": "#D98243"\n      },\n      {\n        "name": "yellow",\n        "value": "#C9B44A"\n      },\n      {\n        "name": "warm white",\n        "value": "#F8F0D4"\n      }\n    ]\n  },\n  "Brochure": {\n    "key": "Brochure",\n    "name": "Brochure",\n    "type": "mesh",\n    "assetType": "object",\n    "value": false,\n    "action": {\n      "type": "open_resource",\n      "data": {}\n    }\n  },\n  "claudia": {\n    "key": "claudia",\n    "type": "gltf",\n    "assetType": "external",\n    "value": {\n      "src": "/models/claudia/claudia.glb",\n      "position": [\n        -2,\n        0.1,\n        0.5\n      ],\n      "scale": [\n        0.88,\n        0.88,\n        0.88\n      ]\n    },\n    "action": {\n      "type": "open_chat",\n      "data": {}\n    }\n  }\n}	booth-preview.png	{\n  "camera": {\n    "position": {\n      "x": 0,\n      "y": 2.5,\n      "z": 10.476249999999999\n    },\n    "orbitTarget": {\n      "x": 0,\n      "y": 2.7,\n      "z": 0\n    },\n    "fov": 35\n  },\n  "renderer": {\n    "toneMapping": "ACESFilmicToneMapping",\n    "toneMappingExposure": 1,\n    "shadowMapEnabled": true,\n    "shadowMap": true\n  },\n  "env": {\n    "hallIntensity": 0.8,\n    "boothIntensity": 2\n  },\n  "subTemplate": "/newbooth-2-low.glb"\n}	2020-04-23 07:59:28+07	2020-04-23 07:59:28+07
8	Hall template 2	\N	hall2.gltf	ACTIVE	HALL	{\n  "lcd_screen": {\n    "key": "lcd_screen",\n    "name": "Centre Screen (1920 x 1080 px)",\n    "desc": "Main LCD",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "banner1": {\n    "key": "banner1",\n    "name": "Left Banner (655 x 1200 px)",\n    "desc": "Banner Left",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "banner2": {\n    "key": "banner2",\n    "name": "Right  Banner (655 x 1200 px)",\n    "desc": "Banner Right",\n    "type": "mesh",\n    "assetType": "image",\n    "value": false,\n    "action": {\n      "type": "popup",\n      "data": {}\n    }\n  },\n  "sky": {\n    "key": "sky",\n    "type": "sky",\n    "assetType": "texture_options",\n    "value": {\n      "name": "malaysia"\n    },\n    "name": "Hall background",\n    "presetValue": [\n      {\n        "name": "singapore",\n        "value": {\n          "title": "Singapore",\n          "repeat": {\n            "x": 0.05,\n            "y": 0.05\n          },\n          "offset": {\n            "x": 0.11,\n            "y": 0.54\n          },\n          "image": "/textures/singapore.jpg"\n        }\n      },\n      {\n        "name": "malaysia",\n        "value": {\n          "title": "Malaysia",\n          "repeat": {\n            "x": 0.05,\n            "y": 0.05\n          },\n          "offset": {\n            "x": 0.11,\n            "y": 0.54\n          },\n          "image": "/textures/malaysia.jpg"\n        }\n      },\n      {\n        "name": "jakarta",\n        "value": {\n          "title": "Jakarta",\n          "repeat": {\n            "x": 0.05,\n            "y": 0.05\n          },\n          "offset": {\n            "x": 0.11,\n            "y": 0.54\n          },\n          "image": "/textures/jakarta.jpg"\n        }\n      }\n    ]\n  },\n  "booths": {\n    "key": "booths",\n    "type": "group_scene",\n    "assetType": "group_scene",\n    "group_name": "Booths Placements",\n    "model": "booth",\n    "boothNumber": 30,\n    "items": [],\n    "modelIdKey": "boothId",\n    "action": {\n      "type": "go-scene"\n    }\n  },\n  "hallbooth": {\n    "key": "hallbooth",\n    "type": "sky",\n    "assetType": "texture_mainsite_options",\n    "value": {\n      "name": "singapore",\n      "model": "/hall/hallStandard2/hall2-booth.gltf"\n    },\n    "presetValue": [\n      {\n        "name": "singapore",\n        "value": {\n          "title": "Singapore",\n          "repeat": {\n            "x": 0.07,\n            "y": 0.07\n          },\n          "offset": {\n            "x": 0.09,\n            "y": 0.4\n          },\n          "image": "/textures/singapore.jpg"\n        }\n      },\n      {\n        "name": "malaysia",\n        "value": {\n          "title": "Malaysia",\n          "repeat": {\n            "x": 0.07,\n            "y": 0.07\n          },\n          "offset": {\n            "x": 0.09,\n            "y": 0.5\n          },\n          "image": "/textures/malaysia.jpg"\n        }\n      },\n      {\n        "name": "jakarta",\n        "value": {\n          "title": "Jakarta",\n          "repeat": {\n            "x": 0.07,\n            "y": 0.07\n          },\n          "offset": {\n            "x": 0.09,\n            "y": 0.5\n          },\n          "image": "/textures/jakarta.jpg"\n        }\n      }\n    ]\n  }\n}	\N	{\n  "camera": {\n    "position": {\n      "x": 0,\n      "y": 5.5,\n      "z": 40\n    },\n    "orbitTarget": {\n      "x": 0,\n      "y": 5,\n      "z": 0\n    },\n    "fov": 35\n  },\n  "renderer": {\n    "toneMapping": "ACESFilmicToneMapping",\n    "toneMappingExposure": 1,\n    "shadowMapEnabled": true,\n    "shadowMap": true\n  },\n  "env": {\n    "modelIntensity": 0.8\n  }\n}	2020-04-23 07:59:28+07	2020-04-23 07:59:28+07
\.


--
-- Data for Name: stages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stages (id, name, status, description, "zoomMeeting", attributes, "centreScreenUrl", "bannerLeftUrl", "bannerRightUrl", "youtubeUrl", type, "createdAt", "updatedAt", "sceneTemplateId", "lobbyId") FROM stdin;
1	Main stage 1	ACTIVE	\N	{"apiKey":"a7YEtM-kTdmD6M5t6GLEuw","apiSecret":"F5Qb5LkfoRq0kZsUQUCSvkU4MTC8TKplfL6p","meetingId":"77709342125","meetingPassword":"9Eqedu","passwordRequired":true}	\N	https://www.facebook.com	https://www.facebook.com	https://www.facebook.com	https://youtu.be/ZBCllYp-SSk	ZOOM	2021-01-08 23:43:34.527+07	2021-04-26 22:27:52.476+07	\N	\N
\.


--
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tests (id, "assetId", "stageId") FROM stdin;
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (id, "userId", token, "createdAt", "updatedAt") FROM stdin;
9	31	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJpYXQiOjE2MTU0ODA3MjMsImV4cCI6MTYxNTQ4MTYyM30.4iHZvaao5i_TKTGIn6wBYGuVUYlgc9DS2DHSV0yeMt4	2021-03-11 22:38:24.616+07	2021-03-11 23:38:43.799+07
4	24	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0LCJpYXQiOjE2MTY5NDcyMzAsImV4cCI6MTYxNjk0ODEzMH0.yFTCWVE-_1egY2GbSSgg4QoHKCvCs0cHQduWxRScgcE	2021-01-21 22:06:07.377+07	2021-03-28 23:00:30.551+07
8	28	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJpYXQiOjE2MTQ4NjcyMjUsImV4cCI6MTYxNDg2ODEyNX0.I99KOpv0mJ28eYMsrt1Hr_aV4yXamyZN_Trpt0m9-40	2021-03-04 21:13:45.642+07	2021-03-04 21:13:45.642+07
7	27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJpYXQiOjE2MTU4MjExMDMsImV4cCI6MTYxNTgyMjAwM30.wb-8rqNx-3nPp_h6bTTV4N2MNFqj9za7jQa2D02avvg	2021-03-03 23:53:23.614+07	2021-03-15 22:11:43.781+07
3	2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYxOTYxNzQ5OSwiZXhwIjoxNjE5NjE4Mzk5fQ.BdALi45RI8H1pd7cvC_V8Atp_0rxeOTw36hCNGx09QM	2021-01-17 21:36:36.029+07	2021-04-28 20:44:59.187+07
11	33	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMzLCJpYXQiOjE2MTk0NDY3NzcsImV4cCI6MTYxOTQ0NzY3N30.O02YlQqt0nj-VK3C1DPPWVYQa0t_elLNrkSZoBBw3lQ	2021-04-26 21:03:34.162+07	2021-04-26 21:19:37.714+07
6	26	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI2LCJpYXQiOjE2MTU4MjY2NTUsImV4cCI6MTYxNTgyNzU1NX0.YbzHYGFlMPvR6BJOU0nnGL_2agP04cwKKfKyQ5KTmpo	2021-02-20 22:47:55.326+07	2021-03-15 23:44:15.881+07
2	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxNjgyMTEzNywiZXhwIjoxNjE2ODIyMDM3fQ.Z0p6Z22_Z08BQdyYliCnAU7MivNVUcW0O4vkqvy6Y60	2020-12-22 17:23:49.078+07	2021-03-27 11:58:57.227+07
12	34	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM0LCJpYXQiOjE2MTk0NDY4OTEsImV4cCI6MTYxOTQ0Nzc5MX0.wKA2a82LO2KL1yIlzD9T1arGoAhVzjHy2oDQUgCsU4U	2021-04-26 21:18:32.751+07	2021-04-26 21:21:31.196+07
13	35	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM1LCJpYXQiOjE2MTk0NDcxNDgsImV4cCI6MTYxOTQ0ODA0OH0.1BMy2_sidZGNSEpq9OPpzglppTkgQIOxkJXzd1aiok4	2021-04-26 21:25:48.986+07	2021-04-26 21:25:48.986+07
14	36	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM2LCJpYXQiOjE2MTk0NDc1MjQsImV4cCI6MTYxOTQ0ODQyNH0.bSeBQVzh-fALw5jSuTopl7NaitvCGytH37j0uZdiC7o	2021-04-26 21:32:04.222+07	2021-04-26 21:32:04.222+07
15	37	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM3LCJpYXQiOjE2MTk0NDgwMjIsImV4cCI6MTYxOTQ0ODkyMn0.lzD8etZgSTyFXLi5KvCTFE5M2ONYSXOG6EYzLWZRoJE	2021-04-26 21:36:31.542+07	2021-04-26 21:40:22.58+07
16	38	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4LCJpYXQiOjE2MTk0NDgwMzEsImV4cCI6MTYxOTQ0ODkzMX0.azggzPd2I8Vc6sK3ODJmHhrKdAHGCJBs_TRq-e0lbL8	2021-04-26 21:40:31.475+07	2021-04-26 21:40:31.475+07
17	39	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM5LCJpYXQiOjE2MTk0NDgyMTgsImV4cCI6MTYxOTQ0OTExOH0.v0PU-4UdWDEVkA1TxJ57RPxnKRCTR_HcguqRb_Z6XIM	2021-04-26 21:43:38.795+07	2021-04-26 21:43:38.795+07
18	40	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQwLCJpYXQiOjE2MTk0NDg0MjksImV4cCI6MTYxOTQ0OTMyOX0.k8yBxFy_W0Eei1dk1sbS-3zsDFNpDqUJk471c0eBDh8	2021-04-26 21:47:09.392+07	2021-04-26 21:47:09.392+07
19	41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQxLCJpYXQiOjE2MTk0NDg2NDcsImV4cCI6MTYxOTQ0OTU0N30.X9SXHOVzWqsiksG-9Tmj5-ZdN1sETML6XcFB_2i3k1I	2021-04-26 21:50:47.825+07	2021-04-26 21:50:47.825+07
5	25	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI1LCJpYXQiOjE2MTY2NjkyODcsImV4cCI6MTYxNjY3MDE4N30.kiE4Zu7P6DnoaclMTXDby7gphMxDwY5qXmEQpxCfKYo	2021-02-12 00:14:58.609+07	2021-03-25 17:48:07.671+07
10	32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMyLCJpYXQiOjE2MTk0NTIwMzAsImV4cCI6MTYxOTQ1MjkzMH0.zxKwodWobDIS1uPWhtWDizX5-Skb5aj_h9zlhCOAH5A	2021-04-26 20:32:59.156+07	2021-04-26 22:47:10.424+07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "firstName", "lastName", email, phone, "userName", password, "roleId", avatar, status, "createdAt", "updatedAt", "organizerId", "boothId", "timeSession", "lastActivity", "selfRegister") FROM stdin;
39	Booth	8	hoanpx.bhsoft+14@gmail.com	\N	hoanpx14	$2a$08$MMF.3Tp6CKoJBKrTpl9Qf.dzO3x/ZS06LyK0OpN75nrLvDLKCgl3C	13	\N	ACTIVE	2021-04-26 20:29:28.037+07	2021-04-26 21:54:43.422+07	1	31	664527	2021-04-26 21:43:38.883+07	f
37	Booth	6	hoanpx.bhsoft+12@gmail.com	\N	hoanpx12	$2a$08$FJnybbVfKyvOk0QIErelfOICFhPT6XYDzmHyVDi43aXLW8zqpGGx6	13	\N	ACTIVE	2021-04-26 20:27:20.163+07	2021-04-26 21:54:43.363+07	1	29	860244	2021-04-26 21:40:22.832+07	f
41	Booth	10	hoanpx.bhsoft+16@gmail.com	\N	hoanpx16	$2a$08$iVcH6EtDl620aLNv3SoN7OlbetESqelQSdMfYOGvSkTOOFoYwelU.	13	\N	ACTIVE	2021-04-26 20:31:01.953+07	2021-04-26 22:01:51.46+07	1	33	658908	2021-04-26 21:54:47.989+07	f
28	Hoan	Phi 6	hoanpx.bhsoft+6@gmail.com	\N	hoanpx6	$2a$08$y2uM.UGTFfiFim.KKdOS/uwUz7rDaest/Rq4nLe9fyUhQ668dsN16	13	\N	ACTIVE	2021-01-20 21:58:45.693+07	2021-03-13 23:25:11.023+07	1	23	163746	2021-03-04 21:15:13.74+07	f
24	Hoan	Phi 2	hoanpx.bhsoft+2@gmail.com	\N	hoanpx2	$2a$08$gy.LoxxDFl3NGmElzAsbtu3WaAtBvzPxSHJqASiJ3bcWimSrjy/VW	13	\N	ACTIVE	2021-01-20 21:56:48.455+07	2021-03-28 23:10:40.147+07	1	19	33102889	2021-03-28 23:10:02.893+07	f
26	Hoan	Phi 4	hoanpx.bhsoft+4@gmail.com	\N	hoanpx4	$2a$08$k1rESEcR6nHKrQhdq5GwQOQF94.ouyFDu23l6LXekED5pP9/jQUcu	13	\N	ACTIVE	2021-01-20 21:57:44.341+07	2021-03-15 23:57:48.883+07	1	21	14571511	2021-03-15 23:44:16.012+07	f
31	Nguyen	Ngoc 2	nguyenngoc2@gmail.com	\N	nguyenngoc2	$2a$08$S9bLxz4rhgzu0v5KJn94BeJE6qhmOsw0z91SPYG7JyhkZ.X2AlHOu	\N	\N	ACTIVE	2021-03-11 22:38:18.389+07	2021-03-11 23:52:51.731+07	\N	\N	2533972	2021-03-11 23:52:42.385+07	f
27	Hoan	Phi 5	hoanpx.bhsoft+5@gmail.com	\N	hoanpx5	$2a$08$3t9B6E3K9iQ9i6I6PnRp5eqtOFPLbmAuwzosR72RZ.ZO1ufgNuK8S	13	\N	ACTIVE	2021-01-20 21:58:15.717+07	2021-03-15 22:13:36.274+07	1	22	4479292	2021-03-15 22:11:43.84+07	f
34	Booth	3	hoanpx.bhsoft+9@gmail.com	\N	hoanpx9	$2a$08$gnY9FZPXMuMoLtegN4tKpeU.RA6Rx2OGAl5aZN6UecF39YdFk2pqm	13	\N	ACTIVE	2021-04-26 20:24:32.061+07	2021-04-26 21:35:31.575+07	1	26	1018534	2021-04-26 21:18:32.862+07	f
35	Booth	4	hoanpx.bhsoft+10@gmail.com	\N	hoanpx10	$2a$08$DyCVBwBNVJ1tx.kTyPgS0u/8.DbFmx4/csWebBdCteAAdJLp2NDDu	13	\N	ACTIVE	2021-04-26 20:25:28.046+07	2021-04-26 21:35:31.583+07	1	27	582200	2021-04-26 21:25:49.184+07	f
29	Nguyen	Ngoc	nguyenngoc@gmail.com	\N	nguyenngoc	$2a$08$tebbJUNplevOegFCPAfZpOkksjkb9DmxYjCcQej9LozP55FMajqm6	\N	\N	ACTIVE	2021-03-11 22:29:48.25+07	2021-03-11 22:29:48.25+07	\N	\N	0	\N	f
30	Nguyen	Ngoc	nguyenngoc1@gmail.com	\N	nguyenngoc1	$2a$08$NvR8OugbI5GNRkny99Nez.myQ1xfnuYtyoT4YMmj1KrD6xkRlKbuS	\N	\N	ACTIVE	2021-03-11 22:36:21.044+07	2021-03-11 22:36:21.044+07	\N	\N	0	\N	f
33	Booth	2	hoanpx.bhsoft+8@gmail.com	\N	hoanpx8	$2a$08$vT5vb7zcGqoN.FE27/lSiuju9bWyiad1THp5ueWJ6RgupctcnS/I6	13	\N	ACTIVE	2021-04-26 20:23:18.423+07	2021-04-26 21:35:31.555+07	1	25	1660162	2021-04-26 21:18:19.977+07	f
1	Phi	Hoan	phihoan10@gmail.com	\N	phihoan10	$2a$08$/mm56bqsTtAoawX4jujyheRqZTg132kx4jZkDrxYBL0yNL.y8swwy	1	\N	ACTIVE	2020-04-23 07:59:28+07	2021-03-27 12:02:05.105+07	1	\N	50550127	2021-03-27 11:58:57.308+07	f
36	Booth	5	hoanpx.bhsoft+11@gmail.com	\N	hoanpx11	$2a$08$7hBAwzcM5Ao8NElzCHfz3.HUDFGs41muLhOoVn3/8jGjPYpPYZDx2	13	\N	ACTIVE	2021-04-26 20:26:16.177+07	2021-04-26 21:54:43.35+07	1	28	1356834	2021-04-26 21:35:33.311+07	f
38	Booth	7	hoanpx.bhsoft+13@gmail.com	\N	hoanpx13	$2a$08$4KPrRCn9XorUYxtvXaZHKefmf0oXyri59RsPF0JZbVjGf81bhiOu.	13	\N	ACTIVE	2021-04-26 20:28:17.593+07	2021-04-26 21:54:43.36+07	1	30	851453	2021-04-26 21:40:31.54+07	f
40	Booth	9	hoanpx.bhsoft+15@gmail.com	\N	hoanpx15	$2a$08$p/IqXCKi6dyNUnn6qmiltOon7lOXscysTHEdAO4tdUZIJu.91Q7ma	13	\N	ACTIVE	2021-04-26 20:30:28.119+07	2021-04-26 21:54:43.37+07	1	32	453498	2021-04-26 21:47:09.498+07	f
32	Booth	1	hoanpx.bhsoft+7@gmail.com	\N	hoanpx7	$2a$08$XC6l0Kkbh8bMmtXL5Y/R/.PvrsBkweLTlEt.1CtpxfXWanSxZEPYi	13	\N	ACTIVE	2021-04-26 20:22:21.513+07	2021-04-26 23:02:14.213+07	1	24	3986553	2021-04-26 23:01:16.124+07	f
25	Hoan	Phi 3	hoanpx.bhsoft+3@gmail.com	\N	hoanpx3	$2a$08$N0C0vSjGLIep2BnsoBlAnucb7dNr6Wv8/EoROtCklzY6VPTSU4nra	13	\N	ACTIVE	2021-01-20 21:57:14.987+07	2021-03-25 17:57:44.232+07	1	20	795532	2021-03-25 17:54:03.136+07	f
2	Hoan	Phi	hoanpx.bhsoft@gmail.com	\N	hoanpx	$2a$08$/mm56bqsTtAoawX4jujyheRqZTg132kx4jZkDrxYBL0yNL.y8swwy	14	\N	ACTIVE	2021-01-17 21:36:36.029+07	2021-04-28 21:01:59.965+07	1	\N	161991943	2021-04-28 20:44:59.333+07	f
\.


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.visits (id, device, "createdAt", "updatedAt", "boothId", "userId", "hallId", "stageId") FROM stdin;
1	BROWSER	2021-03-10 23:43:28.024+07	2021-03-10 23:43:28.024+07	\N	1	\N	\N
2	BROWSER	2021-03-10 23:43:41.24+07	2021-03-10 23:43:41.24+07	\N	1	\N	\N
3	BROWSER	2021-03-10 23:48:06.283+07	2021-03-10 23:48:06.283+07	\N	1	\N	\N
4	BROWSER	2021-03-10 23:49:27.96+07	2021-03-10 23:49:27.96+07	\N	1	\N	\N
5	BROWSER	2021-03-10 23:50:12.95+07	2021-03-10 23:50:12.95+07	\N	1	\N	\N
6	MOBILE	2021-03-10 23:50:22.633+07	2021-03-10 23:50:22.633+07	\N	1	\N	\N
7	BROWSER	2021-03-10 23:50:41.686+07	2021-03-10 23:50:41.686+07	\N	1	\N	\N
8	BROWSER	2021-03-10 23:58:47.216+07	2021-03-10 23:58:47.216+07	\N	1	\N	\N
9	BROWSER	2021-03-11 00:00:41.044+07	2021-03-11 00:00:41.044+07	\N	1	\N	\N
10	BROWSER	2021-03-11 00:00:48.273+07	2021-03-11 00:00:48.273+07	\N	1	\N	\N
11	BROWSER	2021-03-11 00:01:03.173+07	2021-03-11 00:01:03.173+07	\N	1	\N	\N
12	BROWSER	2021-03-11 00:01:12.718+07	2021-03-11 00:01:12.718+07	\N	1	\N	\N
13	BROWSER	2021-03-11 00:01:59.247+07	2021-03-11 00:01:59.247+07	\N	1	\N	\N
14	BROWSER	2021-03-11 00:02:34.192+07	2021-03-11 00:02:34.192+07	\N	1	\N	\N
15	BROWSER	2021-03-11 00:03:25.869+07	2021-03-11 00:03:25.869+07	\N	1	\N	\N
16	BROWSER	2021-03-11 00:04:08.962+07	2021-03-11 00:04:08.962+07	\N	1	\N	\N
17	BROWSER	2021-03-11 00:06:14.919+07	2021-03-11 00:06:14.919+07	\N	1	\N	\N
18	BROWSER	2021-03-11 00:06:24.905+07	2021-03-11 00:06:24.905+07	\N	1	\N	\N
19	BROWSER	2021-03-11 00:06:31.724+07	2021-03-11 00:06:31.724+07	\N	1	\N	\N
20	BROWSER	2021-03-11 00:06:47.755+07	2021-03-11 00:06:47.755+07	\N	1	\N	\N
21	BROWSER	2021-03-11 00:07:01.87+07	2021-03-11 00:07:01.87+07	\N	1	\N	\N
22	BROWSER	2021-03-11 00:07:26.037+07	2021-03-11 00:07:26.037+07	\N	1	\N	\N
23	BROWSER	2021-03-11 00:07:58.586+07	2021-03-11 00:07:58.586+07	\N	1	\N	\N
24	BROWSER	2021-03-11 00:08:09.884+07	2021-03-11 00:08:09.884+07	\N	1	\N	\N
25	BROWSER	2021-03-11 00:09:10.903+07	2021-03-11 00:09:10.903+07	\N	1	\N	\N
26	BROWSER	2021-03-11 00:09:20.008+07	2021-03-11 00:09:20.008+07	\N	1	\N	\N
27	BROWSER	2021-03-11 00:09:50.891+07	2021-03-11 00:09:50.891+07	\N	1	\N	\N
28	BROWSER	2021-03-11 00:12:24.665+07	2021-03-11 00:12:24.665+07	\N	1	\N	\N
29	BROWSER	2021-03-11 00:12:34.992+07	2021-03-11 00:12:34.992+07	\N	1	\N	\N
30	BROWSER	2021-03-11 00:12:48.054+07	2021-03-11 00:12:48.054+07	\N	1	\N	\N
31	BROWSER	2021-03-11 00:15:23.428+07	2021-03-11 00:15:23.428+07	\N	1	\N	\N
32	BROWSER	2021-03-11 00:15:52.468+07	2021-03-11 00:15:52.468+07	\N	1	\N	\N
33	BROWSER	2021-03-11 21:26:36.496+07	2021-03-11 21:26:36.496+07	\N	1	\N	\N
34	BROWSER	2021-03-11 21:44:18.125+07	2021-03-11 21:44:18.125+07	\N	1	\N	\N
35	BROWSER	2021-03-11 21:52:09.403+07	2021-03-11 21:52:09.403+07	\N	1	\N	\N
36	BROWSER	2021-03-11 21:52:30.531+07	2021-03-11 21:52:30.531+07	\N	1	\N	\N
37	BROWSER	2021-03-11 22:38:25.172+07	2021-03-11 22:38:25.172+07	\N	31	\N	\N
38	BROWSER	2021-03-11 22:38:46.947+07	2021-03-11 22:38:46.947+07	\N	31	\N	\N
39	BROWSER	2021-03-11 22:40:21.592+07	2021-03-11 22:40:21.592+07	\N	31	\N	\N
40	BROWSER	2021-03-11 22:40:34.386+07	2021-03-11 22:40:34.386+07	\N	31	\N	\N
41	BROWSER	2021-03-11 22:41:19.815+07	2021-03-11 22:41:19.815+07	\N	31	\N	\N
42	BROWSER	2021-03-11 22:42:26.884+07	2021-03-11 22:42:26.884+07	\N	31	\N	\N
43	BROWSER	2021-03-11 22:42:37.344+07	2021-03-11 22:42:37.344+07	\N	31	\N	\N
44	BROWSER	2021-03-11 22:42:44.232+07	2021-03-11 22:42:44.232+07	\N	1	\N	\N
45	BROWSER	2021-03-11 22:42:49.633+07	2021-03-11 22:42:49.633+07	\N	1	\N	\N
46	BROWSER	2021-03-11 22:44:59.986+07	2021-03-11 22:44:59.986+07	\N	31	\N	\N
47	BROWSER	2021-03-11 22:45:15.754+07	2021-03-11 22:45:15.754+07	\N	2	\N	\N
48	BROWSER	2021-03-11 22:45:20.814+07	2021-03-11 22:45:20.814+07	\N	2	\N	\N
49	BROWSER	2021-03-11 22:46:18.295+07	2021-03-11 22:46:18.295+07	\N	31	\N	\N
50	BROWSER	2021-03-11 22:50:17.266+07	2021-03-11 22:50:17.266+07	\N	31	\N	\N
51	BROWSER	2021-03-11 22:50:46.166+07	2021-03-11 22:50:46.166+07	\N	2	\N	\N
52	BROWSER	2021-03-11 22:50:49.377+07	2021-03-11 22:50:49.377+07	\N	2	\N	\N
53	BROWSER	2021-03-11 22:51:24.446+07	2021-03-11 22:51:24.446+07	\N	2	\N	\N
54	BROWSER	2021-03-11 22:51:32.545+07	2021-03-11 22:51:32.545+07	\N	31	\N	\N
55	BROWSER	2021-03-11 22:55:29.795+07	2021-03-11 22:55:29.795+07	\N	2	\N	\N
56	BROWSER	2021-03-11 22:56:07.434+07	2021-03-11 22:56:07.434+07	\N	1	\N	\N
57	BROWSER	2021-03-11 22:56:39.147+07	2021-03-11 22:56:39.147+07	\N	1	\N	\N
58	BROWSER	2021-03-11 22:58:14.019+07	2021-03-11 22:58:14.019+07	\N	2	\N	\N
59	BROWSER	2021-03-11 23:14:30+07	2021-03-11 23:14:30+07	\N	2	\N	\N
60	BROWSER	2021-03-11 23:16:27.63+07	2021-03-11 23:16:27.63+07	\N	2	\N	\N
61	BROWSER	2021-03-11 23:17:01.877+07	2021-03-11 23:17:01.877+07	\N	31	\N	\N
62	BROWSER	2021-03-11 23:19:18.97+07	2021-03-11 23:19:18.97+07	\N	2	\N	\N
63	BROWSER	2021-03-11 23:20:44.482+07	2021-03-11 23:20:44.482+07	\N	2	\N	\N
64	BROWSER	2021-03-11 23:20:57.409+07	2021-03-11 23:20:57.409+07	\N	31	\N	\N
65	BROWSER	2021-03-11 23:24:06.113+07	2021-03-11 23:24:06.113+07	\N	2	\N	\N
66	BROWSER	2021-03-11 23:24:16.784+07	2021-03-11 23:24:16.784+07	\N	31	\N	\N
67	BROWSER	2021-03-11 23:28:15.898+07	2021-03-11 23:28:15.898+07	\N	31	\N	\N
68	BROWSER	2021-03-11 23:28:29.087+07	2021-03-11 23:28:29.087+07	\N	2	\N	\N
69	BROWSER	2021-03-11 23:29:04.725+07	2021-03-11 23:29:04.725+07	\N	2	\N	\N
70	BROWSER	2021-03-11 23:29:59.944+07	2021-03-11 23:29:59.944+07	\N	2	\N	\N
71	BROWSER	2021-03-11 23:32:28.458+07	2021-03-11 23:32:28.458+07	\N	2	\N	\N
72	BROWSER	2021-03-11 23:33:56.902+07	2021-03-11 23:33:56.902+07	\N	2	\N	\N
73	BROWSER	2021-03-11 23:47:31.571+07	2021-03-11 23:47:31.571+07	\N	31	\N	\N
74	BROWSER	2021-03-11 23:47:33.104+07	2021-03-11 23:47:33.104+07	\N	2	\N	\N
75	BROWSER	2021-03-11 23:47:43.86+07	2021-03-11 23:47:43.86+07	\N	31	\N	\N
76	BROWSER	2021-03-11 23:47:44.668+07	2021-03-11 23:47:44.668+07	\N	2	\N	\N
77	BROWSER	2021-03-11 23:52:42.512+07	2021-03-11 23:52:42.512+07	\N	31	\N	\N
78	BROWSER	2021-03-11 23:52:57.618+07	2021-03-11 23:52:57.618+07	\N	2	\N	\N
79	BROWSER	2021-03-11 23:52:59.218+07	2021-03-11 23:52:59.218+07	\N	2	\N	\N
80	BROWSER	2021-03-11 23:55:34.073+07	2021-03-11 23:55:34.073+07	\N	2	\N	\N
81	BROWSER	2021-03-11 23:56:31.071+07	2021-03-11 23:56:31.071+07	\N	2	\N	\N
82	BROWSER	2021-03-11 23:57:33.261+07	2021-03-11 23:57:33.261+07	\N	2	\N	\N
83	BROWSER	2021-03-11 23:57:40.107+07	2021-03-11 23:57:40.107+07	\N	2	\N	\N
84	BROWSER	2021-03-11 23:58:06.829+07	2021-03-11 23:58:06.829+07	\N	2	\N	\N
85	BROWSER	2021-03-11 23:58:15.679+07	2021-03-11 23:58:15.679+07	\N	2	\N	\N
86	BROWSER	2021-03-11 23:58:38.099+07	2021-03-11 23:58:38.099+07	\N	2	\N	\N
87	BROWSER	2021-03-11 23:59:43.421+07	2021-03-11 23:59:43.421+07	\N	2	\N	\N
88	BROWSER	2021-03-12 00:02:14.859+07	2021-03-12 00:02:14.859+07	\N	2	\N	\N
89	BROWSER	2021-03-12 00:05:24.821+07	2021-03-12 00:05:24.821+07	\N	2	\N	\N
90	BROWSER	2021-03-12 00:05:30.625+07	2021-03-12 00:05:30.625+07	\N	2	\N	\N
91	BROWSER	2021-03-12 00:05:38.032+07	2021-03-12 00:05:38.032+07	\N	2	\N	\N
92	BROWSER	2021-03-12 00:09:00.7+07	2021-03-12 00:09:00.7+07	\N	2	\N	\N
93	BROWSER	2021-03-12 00:09:12.001+07	2021-03-12 00:09:12.001+07	\N	2	\N	\N
94	BROWSER	2021-03-12 00:10:35.555+07	2021-03-12 00:10:35.555+07	\N	2	\N	\N
95	BROWSER	2021-03-12 00:10:43.814+07	2021-03-12 00:10:43.814+07	\N	2	\N	\N
96	BROWSER	2021-03-12 00:10:57.605+07	2021-03-12 00:10:57.605+07	\N	2	\N	\N
97	BROWSER	2021-03-12 00:11:16.345+07	2021-03-12 00:11:16.345+07	\N	2	\N	\N
98	BROWSER	2021-03-12 00:12:49.168+07	2021-03-12 00:12:49.168+07	\N	2	\N	\N
99	BROWSER	2021-03-12 00:13:11.125+07	2021-03-12 00:13:11.125+07	\N	2	\N	\N
100	BROWSER	2021-03-12 00:13:19.229+07	2021-03-12 00:13:19.229+07	\N	2	\N	\N
101	BROWSER	2021-03-12 00:14:03.736+07	2021-03-12 00:14:03.736+07	\N	2	\N	\N
102	BROWSER	2021-03-12 00:15:17.524+07	2021-03-12 00:15:17.524+07	\N	2	\N	\N
103	BROWSER	2021-03-12 00:15:43.249+07	2021-03-12 00:15:43.249+07	\N	2	\N	\N
104	BROWSER	2021-03-12 00:15:54.573+07	2021-03-12 00:15:54.573+07	\N	2	\N	\N
105	BROWSER	2021-03-12 00:16:21.441+07	2021-03-12 00:16:21.441+07	\N	2	\N	\N
106	BROWSER	2021-03-12 00:16:38.996+07	2021-03-12 00:16:38.996+07	\N	2	\N	\N
107	BROWSER	2021-03-12 00:18:44.248+07	2021-03-12 00:18:44.248+07	\N	2	\N	\N
108	BROWSER	2021-03-12 00:18:56.309+07	2021-03-12 00:18:56.309+07	\N	2	\N	\N
109	BROWSER	2021-03-12 00:19:05.315+07	2021-03-12 00:19:05.315+07	\N	2	\N	\N
110	BROWSER	2021-03-12 00:19:30.884+07	2021-03-12 00:19:30.884+07	\N	2	\N	\N
111	BROWSER	2021-03-12 00:19:44.51+07	2021-03-12 00:19:44.51+07	\N	2	\N	\N
112	BROWSER	2021-03-12 00:19:52.634+07	2021-03-12 00:19:52.634+07	\N	2	\N	\N
113	BROWSER	2021-03-12 00:20:14.368+07	2021-03-12 00:20:14.368+07	\N	2	\N	\N
114	BROWSER	2021-03-12 00:20:53.998+07	2021-03-12 00:20:53.998+07	\N	2	\N	\N
115	BROWSER	2021-03-12 00:22:01.703+07	2021-03-12 00:22:01.703+07	\N	2	\N	\N
116	BROWSER	2021-03-12 00:22:05.289+07	2021-03-12 00:22:05.289+07	\N	2	\N	\N
117	BROWSER	2021-03-12 00:22:37.541+07	2021-03-12 00:22:37.541+07	\N	2	\N	\N
118	BROWSER	2021-03-12 00:22:56.373+07	2021-03-12 00:22:56.373+07	\N	2	\N	\N
119	BROWSER	2021-03-12 00:23:37.043+07	2021-03-12 00:23:37.043+07	\N	2	\N	\N
120	BROWSER	2021-03-12 00:23:54.902+07	2021-03-12 00:23:54.902+07	\N	2	\N	\N
121	BROWSER	2021-03-12 00:24:46.963+07	2021-03-12 00:24:46.963+07	\N	2	\N	\N
122	BROWSER	2021-03-12 00:29:30.258+07	2021-03-12 00:29:30.258+07	\N	2	\N	\N
123	BROWSER	2021-03-12 00:31:57.456+07	2021-03-12 00:31:57.456+07	\N	2	\N	\N
124	BROWSER	2021-03-12 00:33:08.391+07	2021-03-12 00:33:08.391+07	\N	2	\N	\N
125	BROWSER	2021-03-12 00:33:41.723+07	2021-03-12 00:33:41.723+07	\N	2	\N	\N
126	BROWSER	2021-03-12 00:33:47.096+07	2021-03-12 00:33:47.096+07	\N	26	\N	\N
127	BROWSER	2021-03-12 00:33:51.915+07	2021-03-12 00:33:51.915+07	\N	26	\N	\N
128	BROWSER	2021-03-12 00:34:41.76+07	2021-03-12 00:34:41.76+07	\N	2	\N	\N
129	BROWSER	2021-03-12 00:35:14.366+07	2021-03-12 00:35:14.366+07	\N	2	\N	\N
130	BROWSER	2021-03-12 00:35:24.419+07	2021-03-12 00:35:24.419+07	\N	26	\N	\N
131	BROWSER	2021-03-12 00:35:58.121+07	2021-03-12 00:35:58.121+07	\N	26	\N	\N
132	BROWSER	2021-03-12 00:36:13.444+07	2021-03-12 00:36:13.444+07	\N	2	\N	\N
133	BROWSER	2021-03-12 00:36:24.947+07	2021-03-12 00:36:24.947+07	\N	26	\N	\N
134	BROWSER	2021-03-12 00:36:54.436+07	2021-03-12 00:36:54.436+07	\N	2	\N	\N
135	BROWSER	2021-03-12 00:37:09.198+07	2021-03-12 00:37:09.198+07	\N	26	\N	\N
136	BROWSER	2021-03-12 00:37:12.697+07	2021-03-12 00:37:12.697+07	\N	26	\N	\N
137	BROWSER	2021-03-12 00:37:31.24+07	2021-03-12 00:37:31.24+07	\N	26	\N	\N
138	BROWSER	2021-03-12 00:37:37.317+07	2021-03-12 00:37:37.317+07	\N	26	\N	\N
139	BROWSER	2021-03-12 00:38:06.982+07	2021-03-12 00:38:06.982+07	\N	26	\N	\N
140	BROWSER	2021-03-12 00:38:48.148+07	2021-03-12 00:38:48.148+07	\N	26	\N	\N
141	BROWSER	2021-03-12 00:39:17.714+07	2021-03-12 00:39:17.714+07	\N	26	\N	\N
142	BROWSER	2021-03-12 00:39:39.402+07	2021-03-12 00:39:39.402+07	\N	26	\N	\N
143	BROWSER	2021-03-12 00:39:45.24+07	2021-03-12 00:39:45.24+07	\N	2	\N	\N
144	BROWSER	2021-03-12 00:40:19.633+07	2021-03-12 00:40:19.633+07	\N	2	\N	\N
145	BROWSER	2021-03-12 20:28:48.564+07	2021-03-12 20:28:48.564+07	\N	2	\N	\N
146	BROWSER	2021-03-12 20:29:05.641+07	2021-03-12 20:29:05.641+07	\N	2	\N	\N
147	BROWSER	2021-03-12 20:29:22.724+07	2021-03-12 20:29:22.724+07	\N	26	\N	\N
148	BROWSER	2021-03-12 20:29:29.311+07	2021-03-12 20:29:29.311+07	\N	26	\N	\N
149	BROWSER	2021-03-12 20:30:16.411+07	2021-03-12 20:30:16.411+07	\N	26	\N	\N
150	BROWSER	2021-03-12 20:31:07.482+07	2021-03-12 20:31:07.482+07	\N	26	\N	\N
151	BROWSER	2021-03-12 20:31:08.305+07	2021-03-12 20:31:08.305+07	\N	2	\N	\N
152	BROWSER	2021-03-12 20:31:26.845+07	2021-03-12 20:31:26.845+07	\N	26	\N	\N
153	BROWSER	2021-03-12 20:32:02.306+07	2021-03-12 20:32:02.306+07	\N	26	\N	\N
154	BROWSER	2021-03-12 20:32:28.739+07	2021-03-12 20:32:28.739+07	\N	26	\N	\N
155	BROWSER	2021-03-12 20:32:56.338+07	2021-03-12 20:32:56.338+07	\N	26	\N	\N
156	BROWSER	2021-03-12 20:33:16.59+07	2021-03-12 20:33:16.59+07	\N	26	\N	\N
157	BROWSER	2021-03-12 20:35:05.964+07	2021-03-12 20:35:05.964+07	\N	26	\N	\N
158	BROWSER	2021-03-12 20:35:16.802+07	2021-03-12 20:35:16.802+07	\N	26	\N	\N
159	BROWSER	2021-03-12 20:35:24.677+07	2021-03-12 20:35:24.677+07	\N	26	\N	\N
160	BROWSER	2021-03-12 20:45:39.985+07	2021-03-12 20:45:39.985+07	\N	26	\N	\N
161	BROWSER	2021-03-12 20:46:11.822+07	2021-03-12 20:46:11.822+07	\N	26	\N	\N
162	BROWSER	2021-03-12 20:46:12.159+07	2021-03-12 20:46:12.159+07	\N	2	\N	\N
163	BROWSER	2021-03-12 20:46:53.116+07	2021-03-12 20:46:53.116+07	\N	26	\N	\N
164	BROWSER	2021-03-12 20:56:52.176+07	2021-03-12 20:56:52.176+07	\N	26	\N	\N
165	BROWSER	2021-03-12 20:58:11.857+07	2021-03-12 20:58:11.857+07	\N	2	\N	\N
166	BROWSER	2021-03-12 20:59:03.586+07	2021-03-12 20:59:03.586+07	\N	2	\N	\N
167	BROWSER	2021-03-12 21:10:43.599+07	2021-03-12 21:10:43.599+07	\N	26	\N	\N
168	BROWSER	2021-03-12 21:10:44.612+07	2021-03-12 21:10:44.612+07	\N	2	\N	\N
169	BROWSER	2021-03-12 21:11:21.426+07	2021-03-12 21:11:21.426+07	\N	26	\N	\N
170	BROWSER	2021-03-12 21:11:22.481+07	2021-03-12 21:11:22.481+07	\N	2	\N	\N
171	BROWSER	2021-03-12 21:12:06.994+07	2021-03-12 21:12:06.994+07	\N	26	\N	\N
172	BROWSER	2021-03-12 21:12:07.978+07	2021-03-12 21:12:07.978+07	\N	2	\N	\N
173	BROWSER	2021-03-12 21:12:27.478+07	2021-03-12 21:12:27.478+07	\N	26	\N	\N
174	BROWSER	2021-03-12 21:12:28.879+07	2021-03-12 21:12:28.879+07	\N	2	\N	\N
175	BROWSER	2021-03-12 21:13:27.629+07	2021-03-12 21:13:27.629+07	\N	26	\N	\N
176	BROWSER	2021-03-12 21:13:28.755+07	2021-03-12 21:13:28.755+07	\N	2	\N	\N
177	BROWSER	2021-03-12 21:16:29.03+07	2021-03-12 21:16:29.03+07	\N	26	\N	\N
178	BROWSER	2021-03-12 21:16:30.393+07	2021-03-12 21:16:30.393+07	\N	2	\N	\N
179	BROWSER	2021-03-12 21:16:51.816+07	2021-03-12 21:16:51.816+07	\N	26	\N	\N
180	BROWSER	2021-03-12 21:16:53.516+07	2021-03-12 21:16:53.516+07	\N	2	\N	\N
181	BROWSER	2021-03-12 21:19:06.832+07	2021-03-12 21:19:06.832+07	\N	26	\N	\N
182	BROWSER	2021-03-12 21:19:09.403+07	2021-03-12 21:19:09.403+07	\N	2	\N	\N
183	BROWSER	2021-03-12 21:19:13.975+07	2021-03-12 21:19:13.975+07	\N	26	\N	\N
184	BROWSER	2021-03-12 21:20:20.73+07	2021-03-12 21:20:20.73+07	\N	26	\N	\N
185	BROWSER	2021-03-12 21:20:44.451+07	2021-03-12 21:20:44.451+07	\N	26	\N	\N
186	BROWSER	2021-03-12 21:21:04.37+07	2021-03-12 21:21:04.37+07	\N	26	\N	\N
187	BROWSER	2021-03-12 21:23:58.367+07	2021-03-12 21:23:58.367+07	\N	2	\N	\N
188	BROWSER	2021-03-12 21:25:00.971+07	2021-03-12 21:25:00.971+07	\N	26	\N	\N
189	BROWSER	2021-03-12 21:25:02.675+07	2021-03-12 21:25:02.675+07	\N	2	\N	\N
190	BROWSER	2021-03-12 21:26:32.337+07	2021-03-12 21:26:32.337+07	\N	26	\N	\N
191	BROWSER	2021-03-12 21:26:33.909+07	2021-03-12 21:26:33.909+07	\N	2	\N	\N
192	BROWSER	2021-03-12 21:26:52.442+07	2021-03-12 21:26:52.442+07	\N	26	\N	\N
193	BROWSER	2021-03-12 21:26:53.391+07	2021-03-12 21:26:53.391+07	\N	2	\N	\N
194	BROWSER	2021-03-12 21:27:02.383+07	2021-03-12 21:27:02.383+07	\N	26	\N	\N
195	BROWSER	2021-03-12 21:27:03.504+07	2021-03-12 21:27:03.504+07	\N	2	\N	\N
196	BROWSER	2021-03-12 21:27:39.776+07	2021-03-12 21:27:39.776+07	\N	26	\N	\N
197	BROWSER	2021-03-12 21:27:41.125+07	2021-03-12 21:27:41.125+07	\N	2	\N	\N
198	BROWSER	2021-03-12 21:29:29.419+07	2021-03-12 21:29:29.419+07	\N	26	\N	\N
199	BROWSER	2021-03-12 21:29:30.543+07	2021-03-12 21:29:30.543+07	\N	2	\N	\N
200	BROWSER	2021-03-12 21:30:35.549+07	2021-03-12 21:30:35.549+07	\N	26	\N	\N
201	BROWSER	2021-03-12 21:30:36.918+07	2021-03-12 21:30:36.918+07	\N	2	\N	\N
202	BROWSER	2021-03-12 21:31:09.82+07	2021-03-12 21:31:09.82+07	\N	26	\N	\N
203	BROWSER	2021-03-12 21:31:12.027+07	2021-03-12 21:31:12.027+07	\N	2	\N	\N
204	BROWSER	2021-03-12 21:32:13.294+07	2021-03-12 21:32:13.294+07	\N	26	\N	\N
205	BROWSER	2021-03-12 21:32:14.765+07	2021-03-12 21:32:14.765+07	\N	2	\N	\N
206	BROWSER	2021-03-12 21:34:32.259+07	2021-03-12 21:34:32.259+07	\N	26	\N	\N
207	BROWSER	2021-03-12 21:34:34.611+07	2021-03-12 21:34:34.611+07	\N	2	\N	\N
208	BROWSER	2021-03-12 21:35:56.29+07	2021-03-12 21:35:56.29+07	\N	26	\N	\N
209	BROWSER	2021-03-12 21:35:58.646+07	2021-03-12 21:35:58.646+07	\N	2	\N	\N
210	BROWSER	2021-03-12 21:38:09.859+07	2021-03-12 21:38:09.859+07	\N	26	\N	\N
211	BROWSER	2021-03-12 21:38:10.798+07	2021-03-12 21:38:10.798+07	\N	2	\N	\N
212	BROWSER	2021-03-12 21:38:53.284+07	2021-03-12 21:38:53.284+07	\N	26	\N	\N
213	BROWSER	2021-03-12 21:38:58.235+07	2021-03-12 21:38:58.235+07	\N	2	\N	\N
214	BROWSER	2021-03-12 21:40:05.972+07	2021-03-12 21:40:05.972+07	\N	26	\N	\N
215	BROWSER	2021-03-12 21:40:09.836+07	2021-03-12 21:40:09.836+07	\N	26	\N	\N
216	BROWSER	2021-03-12 21:40:17.06+07	2021-03-12 21:40:17.06+07	\N	2	\N	\N
217	BROWSER	2021-03-12 21:41:21.1+07	2021-03-12 21:41:21.1+07	\N	2	\N	\N
218	BROWSER	2021-03-12 21:42:15.803+07	2021-03-12 21:42:15.803+07	\N	2	\N	\N
219	BROWSER	2021-03-12 21:43:52.388+07	2021-03-12 21:43:52.388+07	\N	26	\N	\N
220	BROWSER	2021-03-12 21:43:53.539+07	2021-03-12 21:43:53.539+07	\N	2	\N	\N
221	BROWSER	2021-03-12 21:45:59.259+07	2021-03-12 21:45:59.259+07	\N	2	\N	\N
222	BROWSER	2021-03-12 21:46:55.998+07	2021-03-12 21:46:55.998+07	\N	2	\N	\N
223	BROWSER	2021-03-12 21:49:03.987+07	2021-03-12 21:49:03.987+07	\N	2	\N	\N
224	BROWSER	2021-03-12 21:49:14.571+07	2021-03-12 21:49:14.571+07	\N	26	\N	\N
225	BROWSER	2021-03-12 21:49:16.569+07	2021-03-12 21:49:16.569+07	\N	2	\N	\N
226	BROWSER	2021-03-12 21:51:24.059+07	2021-03-12 21:51:24.059+07	\N	26	\N	\N
227	BROWSER	2021-03-12 21:51:57.342+07	2021-03-12 21:51:57.342+07	\N	26	\N	\N
228	BROWSER	2021-03-12 21:52:02.987+07	2021-03-12 21:52:02.987+07	\N	2	\N	\N
229	BROWSER	2021-03-12 21:55:48.171+07	2021-03-12 21:55:48.171+07	\N	26	\N	\N
230	BROWSER	2021-03-12 21:57:11.117+07	2021-03-12 21:57:11.117+07	\N	26	\N	\N
231	BROWSER	2021-03-12 21:57:30.956+07	2021-03-12 21:57:30.956+07	\N	26	\N	\N
232	BROWSER	2021-03-12 22:01:20.203+07	2021-03-12 22:01:20.203+07	\N	2	\N	\N
233	BROWSER	2021-03-12 22:02:24.46+07	2021-03-12 22:02:24.46+07	\N	26	\N	\N
234	BROWSER	2021-03-12 22:02:38.546+07	2021-03-12 22:02:38.546+07	\N	2	\N	\N
235	BROWSER	2021-03-12 22:02:50.393+07	2021-03-12 22:02:50.393+07	\N	2	\N	\N
236	BROWSER	2021-03-12 22:03:19.879+07	2021-03-12 22:03:19.879+07	\N	26	\N	\N
237	BROWSER	2021-03-12 22:03:20.799+07	2021-03-12 22:03:20.799+07	\N	2	\N	\N
238	BROWSER	2021-03-12 22:03:46.28+07	2021-03-12 22:03:46.28+07	\N	2	\N	\N
239	BROWSER	2021-03-12 22:03:54.383+07	2021-03-12 22:03:54.383+07	\N	2	\N	\N
240	BROWSER	2021-03-12 22:05:31.1+07	2021-03-12 22:05:31.1+07	\N	2	\N	\N
241	BROWSER	2021-03-12 22:06:11.11+07	2021-03-12 22:06:11.11+07	\N	2	\N	\N
242	BROWSER	2021-03-12 22:06:58.798+07	2021-03-12 22:06:58.798+07	\N	2	\N	\N
243	BROWSER	2021-03-12 22:07:34.206+07	2021-03-12 22:07:34.206+07	\N	2	\N	\N
244	BROWSER	2021-03-12 22:10:01.074+07	2021-03-12 22:10:01.074+07	\N	26	\N	\N
245	BROWSER	2021-03-12 22:10:01.756+07	2021-03-12 22:10:01.756+07	\N	2	\N	\N
246	BROWSER	2021-03-12 22:10:11.907+07	2021-03-12 22:10:11.907+07	\N	26	\N	\N
247	BROWSER	2021-03-12 22:10:18.383+07	2021-03-12 22:10:18.383+07	\N	2	\N	\N
248	BROWSER	2021-03-12 22:10:52.938+07	2021-03-12 22:10:52.938+07	\N	2	\N	\N
249	BROWSER	2021-03-12 22:10:58.586+07	2021-03-12 22:10:58.586+07	\N	2	\N	\N
250	BROWSER	2021-03-12 22:11:22.74+07	2021-03-12 22:11:22.74+07	\N	2	\N	\N
251	BROWSER	2021-03-12 22:11:36.968+07	2021-03-12 22:11:36.968+07	\N	2	\N	\N
252	BROWSER	2021-03-12 22:17:36.95+07	2021-03-12 22:17:36.95+07	\N	2	\N	\N
253	BROWSER	2021-03-12 22:19:03.364+07	2021-03-12 22:19:03.364+07	\N	2	\N	\N
254	BROWSER	2021-03-12 22:19:22.209+07	2021-03-12 22:19:22.209+07	\N	2	\N	\N
255	BROWSER	2021-03-12 22:19:55.657+07	2021-03-12 22:19:55.657+07	\N	26	\N	\N
256	BROWSER	2021-03-12 22:19:55.747+07	2021-03-12 22:19:55.747+07	\N	2	\N	\N
257	BROWSER	2021-03-12 22:20:55.973+07	2021-03-12 22:20:55.973+07	\N	2	\N	\N
258	BROWSER	2021-03-12 22:21:29.535+07	2021-03-12 22:21:29.535+07	\N	2	\N	\N
259	BROWSER	2021-03-12 22:21:50.226+07	2021-03-12 22:21:50.226+07	\N	2	\N	\N
260	BROWSER	2021-03-12 22:22:45.979+07	2021-03-12 22:22:45.979+07	\N	2	\N	\N
261	BROWSER	2021-03-12 22:23:12.582+07	2021-03-12 22:23:12.582+07	\N	26	\N	\N
262	BROWSER	2021-03-12 22:23:14.456+07	2021-03-12 22:23:14.456+07	\N	2	\N	\N
263	BROWSER	2021-03-12 22:23:46.877+07	2021-03-12 22:23:46.877+07	\N	2	\N	\N
264	BROWSER	2021-03-12 22:24:09.257+07	2021-03-12 22:24:09.257+07	\N	2	\N	\N
265	BROWSER	2021-03-12 22:50:49.732+07	2021-03-12 22:50:49.732+07	\N	26	\N	\N
266	BROWSER	2021-03-12 22:50:49.876+07	2021-03-12 22:50:49.876+07	\N	2	\N	\N
267	BROWSER	2021-03-12 22:51:35.463+07	2021-03-12 22:51:35.463+07	\N	2	\N	\N
268	BROWSER	2021-03-12 22:53:06.57+07	2021-03-12 22:53:06.57+07	\N	2	\N	\N
269	BROWSER	2021-03-12 22:53:18.998+07	2021-03-12 22:53:18.998+07	\N	2	\N	\N
270	BROWSER	2021-03-12 22:53:51.732+07	2021-03-12 22:53:51.732+07	\N	2	\N	\N
271	BROWSER	2021-03-12 22:54:02.714+07	2021-03-12 22:54:02.714+07	\N	2	\N	\N
272	BROWSER	2021-03-12 22:55:13.251+07	2021-03-12 22:55:13.251+07	\N	2	\N	\N
273	BROWSER	2021-03-12 22:55:32.546+07	2021-03-12 22:55:32.546+07	\N	2	\N	\N
274	BROWSER	2021-03-12 22:55:58.483+07	2021-03-12 22:55:58.483+07	\N	2	\N	\N
275	BROWSER	2021-03-12 23:00:37.095+07	2021-03-12 23:00:37.095+07	\N	2	\N	\N
276	BROWSER	2021-03-12 23:01:18.911+07	2021-03-12 23:01:18.911+07	\N	2	\N	\N
277	BROWSER	2021-03-12 23:01:35.988+07	2021-03-12 23:01:35.988+07	\N	2	\N	\N
278	BROWSER	2021-03-12 23:02:51.743+07	2021-03-12 23:02:51.743+07	\N	2	\N	\N
279	BROWSER	2021-03-12 23:03:04.999+07	2021-03-12 23:03:04.999+07	\N	2	\N	\N
280	BROWSER	2021-03-12 23:04:06.089+07	2021-03-12 23:04:06.089+07	\N	2	\N	\N
281	BROWSER	2021-03-12 23:05:38.221+07	2021-03-12 23:05:38.221+07	\N	2	\N	\N
282	BROWSER	2021-03-12 23:07:39.601+07	2021-03-12 23:07:39.601+07	\N	2	\N	\N
283	BROWSER	2021-03-12 23:10:23.989+07	2021-03-12 23:10:23.989+07	\N	2	\N	\N
284	BROWSER	2021-03-12 23:10:57.286+07	2021-03-12 23:10:57.286+07	\N	2	\N	\N
285	BROWSER	2021-03-12 23:11:18.588+07	2021-03-12 23:11:18.588+07	\N	2	\N	\N
286	BROWSER	2021-03-12 23:12:03.851+07	2021-03-12 23:12:03.851+07	\N	2	\N	\N
287	BROWSER	2021-03-12 23:12:35.72+07	2021-03-12 23:12:35.72+07	\N	2	\N	\N
288	BROWSER	2021-03-12 23:13:45.012+07	2021-03-12 23:13:45.012+07	\N	2	\N	\N
289	BROWSER	2021-03-12 23:15:18.112+07	2021-03-12 23:15:18.112+07	\N	2	\N	\N
290	BROWSER	2021-03-12 23:16:27.709+07	2021-03-12 23:16:27.709+07	\N	2	\N	\N
291	BROWSER	2021-03-12 23:16:49.237+07	2021-03-12 23:16:49.237+07	\N	2	\N	\N
292	BROWSER	2021-03-12 23:17:19.917+07	2021-03-12 23:17:19.917+07	\N	2	\N	\N
293	BROWSER	2021-03-12 23:19:13.711+07	2021-03-12 23:19:13.711+07	\N	2	\N	\N
294	BROWSER	2021-03-12 23:20:24.167+07	2021-03-12 23:20:24.167+07	\N	2	\N	\N
295	BROWSER	2021-03-12 23:21:40.347+07	2021-03-12 23:21:40.347+07	\N	2	\N	\N
296	BROWSER	2021-03-12 23:24:04.722+07	2021-03-12 23:24:04.722+07	\N	2	\N	\N
297	BROWSER	2021-03-12 23:25:04.44+07	2021-03-12 23:25:04.44+07	\N	2	\N	\N
298	BROWSER	2021-03-12 23:25:36.582+07	2021-03-12 23:25:36.582+07	\N	2	\N	\N
299	BROWSER	2021-03-12 23:26:19.547+07	2021-03-12 23:26:19.547+07	\N	2	\N	\N
300	BROWSER	2021-03-12 23:27:24.282+07	2021-03-12 23:27:24.282+07	\N	2	\N	\N
301	BROWSER	2021-03-12 23:30:51.041+07	2021-03-12 23:30:51.041+07	\N	2	\N	\N
302	BROWSER	2021-03-12 23:32:52.699+07	2021-03-12 23:32:52.699+07	\N	2	\N	\N
303	BROWSER	2021-03-12 23:33:03.726+07	2021-03-12 23:33:03.726+07	\N	2	\N	\N
304	BROWSER	2021-03-12 23:34:04.068+07	2021-03-12 23:34:04.068+07	\N	2	\N	\N
305	BROWSER	2021-03-12 23:34:40.468+07	2021-03-12 23:34:40.468+07	\N	2	\N	\N
306	BROWSER	2021-03-12 23:35:23.843+07	2021-03-12 23:35:23.843+07	\N	2	\N	\N
307	BROWSER	2021-03-12 23:35:30.195+07	2021-03-12 23:35:30.195+07	\N	2	\N	\N
308	BROWSER	2021-03-12 23:38:16.411+07	2021-03-12 23:38:16.411+07	\N	2	\N	\N
309	BROWSER	2021-03-12 23:39:05.521+07	2021-03-12 23:39:05.521+07	\N	2	\N	\N
310	BROWSER	2021-03-12 23:40:15.014+07	2021-03-12 23:40:15.014+07	\N	2	\N	\N
311	BROWSER	2021-03-12 23:41:21.853+07	2021-03-12 23:41:21.853+07	\N	2	\N	\N
312	BROWSER	2021-03-12 23:41:41.435+07	2021-03-12 23:41:41.435+07	\N	2	\N	\N
313	BROWSER	2021-03-12 23:42:15.523+07	2021-03-12 23:42:15.523+07	\N	2	\N	\N
314	BROWSER	2021-03-12 23:42:50.8+07	2021-03-12 23:42:50.8+07	\N	2	\N	\N
315	BROWSER	2021-03-12 23:43:28.41+07	2021-03-12 23:43:28.41+07	\N	2	\N	\N
316	BROWSER	2021-03-12 23:44:25.337+07	2021-03-12 23:44:25.337+07	\N	2	\N	\N
317	BROWSER	2021-03-12 23:44:44.693+07	2021-03-12 23:44:44.693+07	\N	2	\N	\N
318	BROWSER	2021-03-12 23:50:19.064+07	2021-03-12 23:50:19.064+07	\N	2	\N	\N
319	BROWSER	2021-03-13 00:03:43.093+07	2021-03-13 00:03:43.093+07	\N	2	\N	\N
320	BROWSER	2021-03-13 00:04:56.619+07	2021-03-13 00:04:56.619+07	\N	2	\N	\N
321	BROWSER	2021-03-13 00:06:24.182+07	2021-03-13 00:06:24.182+07	\N	2	\N	\N
322	BROWSER	2021-03-13 00:16:16.704+07	2021-03-13 00:16:16.704+07	\N	2	\N	\N
323	BROWSER	2021-03-13 00:16:47.72+07	2021-03-13 00:16:47.72+07	\N	2	\N	\N
324	BROWSER	2021-03-13 00:17:19.888+07	2021-03-13 00:17:19.888+07	\N	2	\N	\N
325	BROWSER	2021-03-13 00:17:28.719+07	2021-03-13 00:17:28.719+07	\N	2	\N	\N
326	BROWSER	2021-03-13 00:17:45.953+07	2021-03-13 00:17:45.953+07	\N	2	\N	\N
327	BROWSER	2021-03-13 00:18:28.172+07	2021-03-13 00:18:28.172+07	\N	2	\N	\N
328	BROWSER	2021-03-13 00:19:55.255+07	2021-03-13 00:19:55.255+07	\N	2	\N	\N
329	BROWSER	2021-03-13 00:21:58.324+07	2021-03-13 00:21:58.324+07	\N	2	\N	\N
330	BROWSER	2021-03-13 00:23:07.286+07	2021-03-13 00:23:07.286+07	\N	2	\N	\N
331	BROWSER	2021-03-13 00:23:50.859+07	2021-03-13 00:23:50.859+07	\N	2	\N	\N
332	BROWSER	2021-03-13 00:24:26.966+07	2021-03-13 00:24:26.966+07	\N	2	\N	\N
333	BROWSER	2021-03-13 00:24:33.292+07	2021-03-13 00:24:33.292+07	\N	2	\N	\N
334	BROWSER	2021-03-13 00:24:43.507+07	2021-03-13 00:24:43.507+07	\N	2	\N	\N
335	BROWSER	2021-03-13 00:25:14.887+07	2021-03-13 00:25:14.887+07	\N	2	\N	\N
336	BROWSER	2021-03-13 00:29:30.856+07	2021-03-13 00:29:30.856+07	\N	2	\N	\N
337	BROWSER	2021-03-13 00:30:16.523+07	2021-03-13 00:30:16.523+07	\N	2	\N	\N
338	BROWSER	2021-03-13 00:30:58.659+07	2021-03-13 00:30:58.659+07	\N	2	\N	\N
339	BROWSER	2021-03-13 00:31:19.299+07	2021-03-13 00:31:19.299+07	\N	2	\N	\N
340	BROWSER	2021-03-13 00:31:43.298+07	2021-03-13 00:31:43.298+07	\N	2	\N	\N
341	BROWSER	2021-03-13 00:31:56.551+07	2021-03-13 00:31:56.551+07	\N	2	\N	\N
342	BROWSER	2021-03-13 00:32:19.682+07	2021-03-13 00:32:19.682+07	\N	2	\N	\N
343	BROWSER	2021-03-13 00:32:44.593+07	2021-03-13 00:32:44.593+07	\N	2	\N	\N
344	BROWSER	2021-03-13 00:33:07.387+07	2021-03-13 00:33:07.387+07	\N	2	\N	\N
345	BROWSER	2021-03-13 00:33:30.219+07	2021-03-13 00:33:30.219+07	\N	2	\N	\N
346	BROWSER	2021-03-13 00:33:35.817+07	2021-03-13 00:33:35.817+07	\N	2	\N	\N
347	BROWSER	2021-03-13 00:34:29.38+07	2021-03-13 00:34:29.38+07	\N	2	\N	\N
348	BROWSER	2021-03-13 00:34:40.978+07	2021-03-13 00:34:40.978+07	\N	2	\N	\N
349	BROWSER	2021-03-13 00:35:02.454+07	2021-03-13 00:35:02.454+07	\N	2	\N	\N
350	BROWSER	2021-03-13 00:37:17.037+07	2021-03-13 00:37:17.037+07	\N	2	\N	\N
351	BROWSER	2021-03-13 00:38:35.366+07	2021-03-13 00:38:35.366+07	\N	2	\N	\N
352	BROWSER	2021-03-13 00:39:53.464+07	2021-03-13 00:39:53.464+07	\N	2	\N	\N
353	BROWSER	2021-03-13 00:41:03.871+07	2021-03-13 00:41:03.871+07	\N	2	\N	\N
354	BROWSER	2021-03-13 00:41:41.732+07	2021-03-13 00:41:41.732+07	\N	2	\N	\N
355	BROWSER	2021-03-13 00:42:06.065+07	2021-03-13 00:42:06.065+07	\N	2	\N	\N
356	BROWSER	2021-03-13 00:42:34.54+07	2021-03-13 00:42:34.54+07	\N	2	\N	\N
357	BROWSER	2021-03-13 00:44:02.482+07	2021-03-13 00:44:02.482+07	\N	2	\N	\N
358	BROWSER	2021-03-13 00:44:24.915+07	2021-03-13 00:44:24.915+07	\N	2	\N	\N
359	BROWSER	2021-03-13 00:45:06.559+07	2021-03-13 00:45:06.559+07	\N	2	\N	\N
360	BROWSER	2021-03-13 00:45:52.552+07	2021-03-13 00:45:52.552+07	\N	2	\N	\N
361	BROWSER	2021-03-13 00:46:12.292+07	2021-03-13 00:46:12.292+07	\N	2	\N	\N
362	BROWSER	2021-03-13 00:49:52.769+07	2021-03-13 00:49:52.769+07	\N	2	\N	\N
363	BROWSER	2021-03-13 00:56:26.115+07	2021-03-13 00:56:26.115+07	\N	2	\N	\N
364	BROWSER	2021-03-13 00:57:09.051+07	2021-03-13 00:57:09.051+07	\N	2	\N	\N
365	BROWSER	2021-03-13 00:57:25.988+07	2021-03-13 00:57:25.988+07	\N	2	\N	\N
366	BROWSER	2021-03-13 00:58:06.801+07	2021-03-13 00:58:06.801+07	\N	2	\N	\N
367	BROWSER	2021-03-13 00:58:27.601+07	2021-03-13 00:58:27.601+07	\N	2	\N	\N
368	BROWSER	2021-03-13 01:00:18.33+07	2021-03-13 01:00:18.33+07	\N	2	\N	\N
369	BROWSER	2021-03-13 01:00:55.226+07	2021-03-13 01:00:55.226+07	\N	2	\N	\N
370	BROWSER	2021-03-13 01:03:17.408+07	2021-03-13 01:03:17.408+07	\N	2	\N	\N
371	BROWSER	2021-03-13 01:03:34.792+07	2021-03-13 01:03:34.792+07	\N	2	\N	\N
372	BROWSER	2021-03-13 01:09:55.066+07	2021-03-13 01:09:55.066+07	\N	2	\N	\N
373	BROWSER	2021-03-13 01:11:15.223+07	2021-03-13 01:11:15.223+07	\N	2	\N	\N
374	BROWSER	2021-03-13 01:11:31.205+07	2021-03-13 01:11:31.205+07	\N	2	\N	\N
375	BROWSER	2021-03-13 01:15:51.964+07	2021-03-13 01:15:51.964+07	\N	2	\N	\N
376	BROWSER	2021-03-13 01:16:19.578+07	2021-03-13 01:16:19.578+07	\N	2	\N	\N
377	BROWSER	2021-03-13 01:16:53.068+07	2021-03-13 01:16:53.068+07	\N	2	\N	\N
378	BROWSER	2021-03-13 01:16:56.302+07	2021-03-13 01:16:56.302+07	\N	2	\N	\N
379	BROWSER	2021-03-13 10:56:29.94+07	2021-03-13 10:56:29.94+07	\N	2	\N	\N
380	BROWSER	2021-03-13 10:56:44.138+07	2021-03-13 10:56:44.138+07	\N	2	\N	\N
381	BROWSER	2021-03-13 10:59:03.854+07	2021-03-13 10:59:03.854+07	\N	2	\N	\N
382	BROWSER	2021-03-13 11:02:05.962+07	2021-03-13 11:02:05.962+07	\N	2	\N	\N
383	BROWSER	2021-03-13 11:03:22.678+07	2021-03-13 11:03:22.678+07	\N	2	\N	\N
384	BROWSER	2021-03-13 11:03:36.034+07	2021-03-13 11:03:36.034+07	\N	2	\N	\N
385	BROWSER	2021-03-13 11:08:42.783+07	2021-03-13 11:08:42.783+07	\N	2	\N	\N
386	BROWSER	2021-03-13 11:08:58.722+07	2021-03-13 11:08:58.722+07	\N	2	\N	\N
387	BROWSER	2021-03-13 11:09:09.401+07	2021-03-13 11:09:09.401+07	\N	2	\N	\N
388	BROWSER	2021-03-13 11:10:03.533+07	2021-03-13 11:10:03.533+07	\N	2	\N	\N
389	BROWSER	2021-03-13 11:10:16.307+07	2021-03-13 11:10:16.307+07	\N	2	\N	\N
390	BROWSER	2021-03-13 11:10:44.766+07	2021-03-13 11:10:44.766+07	\N	2	\N	\N
391	BROWSER	2021-03-13 11:11:21.377+07	2021-03-13 11:11:21.377+07	\N	2	\N	\N
392	BROWSER	2021-03-13 11:11:33.901+07	2021-03-13 11:11:33.901+07	\N	2	\N	\N
393	BROWSER	2021-03-13 11:14:50.381+07	2021-03-13 11:14:50.381+07	\N	2	\N	\N
394	BROWSER	2021-03-13 11:16:01.138+07	2021-03-13 11:16:01.138+07	\N	2	\N	\N
395	BROWSER	2021-03-13 11:19:07.603+07	2021-03-13 11:19:07.603+07	\N	2	\N	\N
396	BROWSER	2021-03-13 11:19:49.505+07	2021-03-13 11:19:49.505+07	\N	2	\N	\N
397	BROWSER	2021-03-13 11:20:04.34+07	2021-03-13 11:20:04.34+07	\N	2	\N	\N
398	BROWSER	2021-03-13 11:31:41.028+07	2021-03-13 11:31:41.028+07	\N	2	\N	\N
399	BROWSER	2021-03-13 11:31:45.835+07	2021-03-13 11:31:45.835+07	\N	2	\N	\N
400	BROWSER	2021-03-13 11:32:09.854+07	2021-03-13 11:32:09.854+07	\N	2	\N	\N
401	BROWSER	2021-03-13 11:32:24.721+07	2021-03-13 11:32:24.721+07	\N	2	\N	\N
402	BROWSER	2021-03-13 11:39:10.94+07	2021-03-13 11:39:10.94+07	\N	2	\N	\N
403	BROWSER	2021-03-13 11:40:41.531+07	2021-03-13 11:40:41.531+07	\N	2	\N	\N
404	BROWSER	2021-03-13 11:41:58.798+07	2021-03-13 11:41:58.798+07	\N	2	\N	\N
405	BROWSER	2021-03-13 11:44:13.592+07	2021-03-13 11:44:13.592+07	\N	2	\N	\N
406	BROWSER	2021-03-13 11:44:50.874+07	2021-03-13 11:44:50.874+07	\N	2	\N	\N
407	BROWSER	2021-03-13 11:46:54.909+07	2021-03-13 11:46:54.909+07	\N	2	\N	\N
408	BROWSER	2021-03-13 11:47:21.08+07	2021-03-13 11:47:21.08+07	\N	2	\N	\N
409	BROWSER	2021-03-13 11:47:54.138+07	2021-03-13 11:47:54.138+07	\N	2	\N	\N
410	BROWSER	2021-03-13 11:53:30.142+07	2021-03-13 11:53:30.142+07	\N	2	\N	\N
411	BROWSER	2021-03-13 11:54:22.462+07	2021-03-13 11:54:22.462+07	\N	2	\N	\N
412	BROWSER	2021-03-13 11:54:47.281+07	2021-03-13 11:54:47.281+07	\N	2	\N	\N
413	BROWSER	2021-03-13 11:55:37.923+07	2021-03-13 11:55:37.923+07	\N	2	\N	\N
414	BROWSER	2021-03-13 11:56:02.024+07	2021-03-13 11:56:02.024+07	\N	2	\N	\N
415	BROWSER	2021-03-13 11:56:53.524+07	2021-03-13 11:56:53.524+07	\N	2	\N	\N
416	BROWSER	2021-03-13 11:57:11.721+07	2021-03-13 11:57:11.721+07	\N	2	\N	\N
417	BROWSER	2021-03-13 11:58:24.609+07	2021-03-13 11:58:24.609+07	\N	2	\N	\N
418	BROWSER	2021-03-13 11:58:44.881+07	2021-03-13 11:58:44.881+07	\N	2	\N	\N
419	BROWSER	2021-03-13 11:59:04.916+07	2021-03-13 11:59:04.916+07	\N	2	\N	\N
420	BROWSER	2021-03-13 11:59:35.695+07	2021-03-13 11:59:35.695+07	\N	2	\N	\N
421	BROWSER	2021-03-13 12:00:33.45+07	2021-03-13 12:00:33.45+07	\N	2	\N	\N
422	BROWSER	2021-03-13 12:01:32.912+07	2021-03-13 12:01:32.912+07	\N	2	\N	\N
423	BROWSER	2021-03-13 12:03:50.84+07	2021-03-13 12:03:50.84+07	\N	2	\N	\N
424	BROWSER	2021-03-13 12:04:49.218+07	2021-03-13 12:04:49.218+07	\N	2	\N	\N
425	BROWSER	2021-03-13 12:06:00.334+07	2021-03-13 12:06:00.334+07	\N	2	\N	\N
426	BROWSER	2021-03-13 12:06:09.783+07	2021-03-13 12:06:09.783+07	\N	2	\N	\N
427	BROWSER	2021-03-13 12:06:26.777+07	2021-03-13 12:06:26.777+07	\N	2	\N	\N
428	BROWSER	2021-03-13 12:06:56.351+07	2021-03-13 12:06:56.351+07	\N	2	\N	\N
429	BROWSER	2021-03-13 12:07:18.117+07	2021-03-13 12:07:18.117+07	\N	2	\N	\N
430	BROWSER	2021-03-13 12:08:10.108+07	2021-03-13 12:08:10.108+07	\N	2	\N	\N
431	BROWSER	2021-03-13 12:08:41.116+07	2021-03-13 12:08:41.116+07	\N	2	\N	\N
432	BROWSER	2021-03-13 12:11:18.244+07	2021-03-13 12:11:18.244+07	\N	2	\N	\N
433	BROWSER	2021-03-13 12:11:21.311+07	2021-03-13 12:11:21.311+07	\N	2	\N	\N
434	BROWSER	2021-03-13 12:12:28.938+07	2021-03-13 12:12:28.938+07	\N	2	\N	\N
435	BROWSER	2021-03-13 12:13:26.795+07	2021-03-13 12:13:26.795+07	\N	2	\N	\N
436	BROWSER	2021-03-13 12:15:31.146+07	2021-03-13 12:15:31.146+07	\N	2	\N	\N
437	BROWSER	2021-03-13 12:15:42.023+07	2021-03-13 12:15:42.023+07	\N	2	\N	\N
438	BROWSER	2021-03-13 12:15:56.138+07	2021-03-13 12:15:56.138+07	\N	2	\N	\N
439	BROWSER	2021-03-13 12:15:58.727+07	2021-03-13 12:15:58.727+07	\N	2	\N	\N
440	BROWSER	2021-03-13 16:33:44.349+07	2021-03-13 16:33:44.349+07	\N	2	\N	\N
441	BROWSER	2021-03-13 17:03:53.038+07	2021-03-13 17:03:53.038+07	\N	2	\N	\N
442	BROWSER	2021-03-13 21:31:12.64+07	2021-03-13 21:31:12.64+07	\N	2	\N	\N
443	BROWSER	2021-03-13 21:31:32.857+07	2021-03-13 21:31:32.857+07	\N	2	\N	\N
444	BROWSER	2021-03-13 21:32:51.314+07	2021-03-13 21:32:51.314+07	\N	2	\N	\N
445	BROWSER	2021-03-13 22:04:19.597+07	2021-03-13 22:04:19.597+07	\N	2	\N	\N
446	BROWSER	2021-03-13 22:04:26.828+07	2021-03-13 22:04:26.828+07	\N	2	\N	\N
447	BROWSER	2021-03-13 22:04:55.769+07	2021-03-13 22:04:55.769+07	\N	1	\N	\N
448	BROWSER	2021-03-13 22:05:31.329+07	2021-03-13 22:05:31.329+07	\N	2	\N	\N
449	BROWSER	2021-03-13 22:05:39.723+07	2021-03-13 22:05:39.723+07	\N	2	\N	\N
450	BROWSER	2021-03-13 22:05:43.167+07	2021-03-13 22:05:43.167+07	\N	2	\N	\N
451	BROWSER	2021-03-13 22:05:48.998+07	2021-03-13 22:05:48.998+07	\N	1	\N	\N
452	BROWSER	2021-03-13 22:06:36.799+07	2021-03-13 22:06:36.799+07	\N	2	\N	\N
453	BROWSER	2021-03-13 22:07:31.527+07	2021-03-13 22:07:31.527+07	\N	2	\N	\N
454	BROWSER	2021-03-13 22:08:50.179+07	2021-03-13 22:08:50.179+07	\N	2	\N	\N
455	BROWSER	2021-03-13 22:10:28.871+07	2021-03-13 22:10:28.871+07	\N	2	\N	\N
456	BROWSER	2021-03-13 22:11:37.881+07	2021-03-13 22:11:37.881+07	\N	2	\N	\N
457	BROWSER	2021-03-13 22:12:10.766+07	2021-03-13 22:12:10.766+07	\N	2	\N	\N
458	BROWSER	2021-03-13 22:13:31.937+07	2021-03-13 22:13:31.937+07	\N	2	\N	\N
459	BROWSER	2021-03-13 22:14:24.418+07	2021-03-13 22:14:24.418+07	\N	2	\N	\N
460	BROWSER	2021-03-13 22:15:32.143+07	2021-03-13 22:15:32.143+07	\N	2	\N	\N
461	BROWSER	2021-03-13 22:16:09.597+07	2021-03-13 22:16:09.597+07	\N	2	\N	\N
462	BROWSER	2021-03-13 22:16:39.749+07	2021-03-13 22:16:39.749+07	\N	2	\N	\N
463	BROWSER	2021-03-13 22:17:07.401+07	2021-03-13 22:17:07.401+07	\N	2	\N	\N
464	BROWSER	2021-03-13 22:20:14.006+07	2021-03-13 22:20:14.006+07	\N	2	\N	\N
465	BROWSER	2021-03-13 22:25:38.075+07	2021-03-13 22:25:38.075+07	\N	2	\N	\N
466	BROWSER	2021-03-13 22:25:50.471+07	2021-03-13 22:25:50.471+07	\N	2	\N	\N
467	BROWSER	2021-03-13 22:26:16.872+07	2021-03-13 22:26:16.872+07	\N	2	\N	\N
468	BROWSER	2021-03-13 22:26:32.356+07	2021-03-13 22:26:32.356+07	\N	2	\N	\N
469	BROWSER	2021-03-13 22:26:57.371+07	2021-03-13 22:26:57.371+07	\N	2	\N	\N
470	BROWSER	2021-03-13 22:27:37.017+07	2021-03-13 22:27:37.017+07	\N	2	\N	\N
471	BROWSER	2021-03-13 22:27:59.169+07	2021-03-13 22:27:59.169+07	\N	2	\N	\N
472	BROWSER	2021-03-13 22:28:59.194+07	2021-03-13 22:28:59.194+07	\N	2	\N	\N
473	BROWSER	2021-03-13 22:32:18.93+07	2021-03-13 22:32:18.93+07	\N	2	\N	\N
474	BROWSER	2021-03-13 22:34:09.867+07	2021-03-13 22:34:09.867+07	\N	2	\N	\N
475	BROWSER	2021-03-13 22:34:45.809+07	2021-03-13 22:34:45.809+07	\N	2	\N	\N
476	BROWSER	2021-03-13 22:36:43.357+07	2021-03-13 22:36:43.357+07	\N	2	\N	\N
477	BROWSER	2021-03-13 22:36:47.775+07	2021-03-13 22:36:47.775+07	\N	2	\N	\N
478	BROWSER	2021-03-13 22:39:23.322+07	2021-03-13 22:39:23.322+07	\N	2	\N	\N
479	BROWSER	2021-03-13 22:39:28.669+07	2021-03-13 22:39:28.669+07	\N	2	\N	\N
480	BROWSER	2021-03-13 22:41:43.993+07	2021-03-13 22:41:43.993+07	\N	2	\N	\N
481	BROWSER	2021-03-13 22:45:45.614+07	2021-03-13 22:45:45.614+07	\N	2	\N	\N
482	BROWSER	2021-03-13 22:46:01.688+07	2021-03-13 22:46:01.688+07	\N	2	\N	\N
483	BROWSER	2021-03-13 22:46:58.314+07	2021-03-13 22:46:58.314+07	\N	2	\N	\N
484	BROWSER	2021-03-13 22:47:18.592+07	2021-03-13 22:47:18.592+07	\N	2	\N	\N
485	BROWSER	2021-03-13 22:48:23.4+07	2021-03-13 22:48:23.4+07	\N	2	\N	\N
486	BROWSER	2021-03-13 22:50:33.431+07	2021-03-13 22:50:33.431+07	\N	2	\N	\N
487	BROWSER	2021-03-13 22:53:00.689+07	2021-03-13 22:53:00.689+07	\N	2	\N	\N
488	BROWSER	2021-03-13 22:53:13.111+07	2021-03-13 22:53:13.111+07	\N	2	\N	\N
489	BROWSER	2021-03-13 22:54:32.886+07	2021-03-13 22:54:32.886+07	\N	2	\N	\N
490	BROWSER	2021-03-13 23:02:45.248+07	2021-03-13 23:02:45.248+07	\N	2	\N	\N
491	BROWSER	2021-03-13 23:06:12.233+07	2021-03-13 23:06:12.233+07	\N	2	\N	\N
492	BROWSER	2021-03-13 23:08:07.806+07	2021-03-13 23:08:07.806+07	\N	2	\N	\N
493	BROWSER	2021-03-13 23:09:13.888+07	2021-03-13 23:09:13.888+07	\N	2	\N	\N
494	BROWSER	2021-03-13 23:10:55.672+07	2021-03-13 23:10:55.672+07	\N	2	\N	\N
495	BROWSER	2021-03-13 23:11:22.654+07	2021-03-13 23:11:22.654+07	\N	2	\N	\N
496	BROWSER	2021-03-13 23:12:13.164+07	2021-03-13 23:12:13.164+07	\N	2	\N	\N
497	BROWSER	2021-03-13 23:17:18.174+07	2021-03-13 23:17:18.174+07	\N	2	\N	\N
498	BROWSER	2021-03-13 23:17:41.082+07	2021-03-13 23:17:41.082+07	\N	2	\N	\N
499	BROWSER	2021-03-13 23:18:38.459+07	2021-03-13 23:18:38.459+07	\N	2	\N	\N
500	BROWSER	2021-03-13 23:19:04.699+07	2021-03-13 23:19:04.699+07	\N	2	\N	\N
501	BROWSER	2021-03-13 23:19:19.253+07	2021-03-13 23:19:19.253+07	\N	2	\N	\N
502	BROWSER	2021-03-13 23:21:15.054+07	2021-03-13 23:21:15.054+07	\N	2	\N	\N
503	BROWSER	2021-03-13 23:21:39.442+07	2021-03-13 23:21:39.442+07	\N	2	\N	\N
504	BROWSER	2021-03-13 23:23:42.738+07	2021-03-13 23:23:42.738+07	\N	2	\N	\N
505	BROWSER	2021-03-13 23:23:56.153+07	2021-03-13 23:23:56.153+07	\N	2	\N	\N
506	BROWSER	2021-03-13 23:26:12.592+07	2021-03-13 23:26:12.592+07	\N	2	\N	\N
507	BROWSER	2021-03-13 23:28:32.655+07	2021-03-13 23:28:32.655+07	\N	2	\N	\N
508	BROWSER	2021-03-13 23:28:44.236+07	2021-03-13 23:28:44.236+07	\N	2	\N	\N
509	BROWSER	2021-03-13 23:33:40.013+07	2021-03-13 23:33:40.013+07	\N	2	\N	\N
510	BROWSER	2021-03-13 23:35:32.066+07	2021-03-13 23:35:32.066+07	\N	2	\N	\N
511	BROWSER	2021-03-13 23:35:43.264+07	2021-03-13 23:35:43.264+07	\N	2	\N	\N
512	BROWSER	2021-03-13 23:37:02.163+07	2021-03-13 23:37:02.163+07	\N	2	\N	\N
513	BROWSER	2021-03-13 23:37:29.773+07	2021-03-13 23:37:29.773+07	\N	2	\N	\N
514	BROWSER	2021-03-13 23:38:06.403+07	2021-03-13 23:38:06.403+07	\N	2	\N	\N
515	BROWSER	2021-03-13 23:41:07.93+07	2021-03-13 23:41:07.93+07	\N	2	\N	\N
516	BROWSER	2021-03-13 23:43:31.339+07	2021-03-13 23:43:31.339+07	\N	2	\N	\N
517	BROWSER	2021-03-13 23:43:56.803+07	2021-03-13 23:43:56.803+07	\N	2	\N	\N
518	BROWSER	2021-03-13 23:48:22.197+07	2021-03-13 23:48:22.197+07	\N	2	\N	\N
519	BROWSER	2021-03-13 23:48:27.126+07	2021-03-13 23:48:27.126+07	\N	1	\N	\N
520	BROWSER	2021-03-13 23:48:39.815+07	2021-03-13 23:48:39.815+07	\N	2	\N	\N
521	BROWSER	2021-03-14 00:02:28.501+07	2021-03-14 00:02:28.501+07	\N	2	\N	\N
522	BROWSER	2021-03-14 11:33:18.477+07	2021-03-14 11:33:18.477+07	\N	2	\N	\N
523	BROWSER	2021-03-14 11:33:39.856+07	2021-03-14 11:33:39.856+07	\N	2	\N	\N
524	BROWSER	2021-03-14 12:11:45.284+07	2021-03-14 12:11:45.284+07	\N	2	\N	\N
525	BROWSER	2021-03-14 20:21:25.741+07	2021-03-14 20:21:25.741+07	\N	2	\N	\N
526	BROWSER	2021-03-14 20:37:33.81+07	2021-03-14 20:37:33.81+07	\N	2	\N	\N
527	BROWSER	2021-03-14 20:37:56.276+07	2021-03-14 20:37:56.276+07	\N	2	\N	\N
528	BROWSER	2021-03-14 20:38:11.492+07	2021-03-14 20:38:11.492+07	\N	2	\N	\N
529	BROWSER	2021-03-14 21:13:07.956+07	2021-03-14 21:13:07.956+07	\N	2	\N	\N
530	BROWSER	2021-03-14 21:14:48.602+07	2021-03-14 21:14:48.602+07	\N	2	\N	\N
531	BROWSER	2021-03-14 21:15:42.855+07	2021-03-14 21:15:42.855+07	\N	2	\N	\N
532	BROWSER	2021-03-14 21:24:48.816+07	2021-03-14 21:24:48.816+07	\N	2	\N	\N
533	BROWSER	2021-03-14 21:25:43.47+07	2021-03-14 21:25:43.47+07	\N	2	\N	\N
534	BROWSER	2021-03-14 21:26:17.676+07	2021-03-14 21:26:17.676+07	\N	2	\N	\N
535	BROWSER	2021-03-14 21:29:07.741+07	2021-03-14 21:29:07.741+07	\N	2	\N	\N
536	BROWSER	2021-03-14 21:29:25.036+07	2021-03-14 21:29:25.036+07	\N	2	\N	\N
537	BROWSER	2021-03-14 21:41:55.734+07	2021-03-14 21:41:55.734+07	\N	2	\N	\N
538	BROWSER	2021-03-14 21:43:48.822+07	2021-03-14 21:43:48.822+07	\N	2	\N	\N
539	BROWSER	2021-03-14 21:45:11.3+07	2021-03-14 21:45:11.3+07	\N	2	\N	\N
540	BROWSER	2021-03-14 21:46:49.222+07	2021-03-14 21:46:49.222+07	\N	2	\N	\N
541	BROWSER	2021-03-14 21:48:02.424+07	2021-03-14 21:48:02.424+07	\N	2	\N	\N
542	BROWSER	2021-03-14 21:48:16.287+07	2021-03-14 21:48:16.287+07	\N	26	\N	\N
543	BROWSER	2021-03-14 21:48:24.928+07	2021-03-14 21:48:24.928+07	\N	26	\N	\N
544	BROWSER	2021-03-14 21:48:32.163+07	2021-03-14 21:48:32.163+07	\N	1	\N	\N
545	BROWSER	2021-03-14 21:50:19.973+07	2021-03-14 21:50:19.973+07	\N	1	\N	\N
546	BROWSER	2021-03-14 21:50:23.317+07	2021-03-14 21:50:23.317+07	\N	2	\N	\N
547	BROWSER	2021-03-14 21:51:10.579+07	2021-03-14 21:51:10.579+07	\N	2	\N	\N
548	BROWSER	2021-03-14 21:54:19.509+07	2021-03-14 21:54:19.509+07	\N	2	\N	\N
549	BROWSER	2021-03-14 22:10:48.869+07	2021-03-14 22:10:48.869+07	\N	1	\N	\N
550	BROWSER	2021-03-14 22:10:49.722+07	2021-03-14 22:10:49.722+07	\N	2	\N	\N
551	BROWSER	2021-03-14 22:11:44.17+07	2021-03-14 22:11:44.17+07	\N	2	\N	\N
552	BROWSER	2021-03-14 22:14:11.822+07	2021-03-14 22:14:11.822+07	\N	2	\N	\N
553	BROWSER	2021-03-14 22:14:19.404+07	2021-03-14 22:14:19.404+07	\N	2	\N	\N
554	BROWSER	2021-03-14 22:14:44.376+07	2021-03-14 22:14:44.376+07	\N	2	\N	\N
555	BROWSER	2021-03-14 22:14:56.317+07	2021-03-14 22:14:56.317+07	\N	2	\N	\N
556	BROWSER	2021-03-14 22:51:37.224+07	2021-03-14 22:51:37.224+07	\N	2	\N	\N
557	BROWSER	2021-03-14 22:53:01.838+07	2021-03-14 22:53:01.838+07	\N	2	\N	\N
558	BROWSER	2021-03-14 22:54:02.827+07	2021-03-14 22:54:02.827+07	\N	2	\N	\N
559	BROWSER	2021-03-14 22:55:15.931+07	2021-03-14 22:55:15.931+07	\N	2	\N	\N
560	BROWSER	2021-03-14 22:57:48.861+07	2021-03-14 22:57:48.861+07	\N	2	\N	\N
561	BROWSER	2021-03-14 22:58:23.762+07	2021-03-14 22:58:23.762+07	\N	2	\N	\N
562	BROWSER	2021-03-14 22:59:11.382+07	2021-03-14 22:59:11.382+07	\N	2	\N	\N
563	BROWSER	2021-03-14 23:02:46.406+07	2021-03-14 23:02:46.406+07	\N	2	\N	\N
564	BROWSER	2021-03-14 23:03:04.875+07	2021-03-14 23:03:04.875+07	\N	2	\N	\N
565	BROWSER	2021-03-14 23:08:22.966+07	2021-03-14 23:08:22.966+07	\N	1	\N	\N
566	BROWSER	2021-03-14 23:08:24.232+07	2021-03-14 23:08:24.232+07	\N	2	\N	\N
567	BROWSER	2021-03-14 23:09:35.64+07	2021-03-14 23:09:35.64+07	\N	1	\N	\N
568	BROWSER	2021-03-14 23:09:37.279+07	2021-03-14 23:09:37.279+07	\N	2	\N	\N
569	BROWSER	2021-03-14 23:31:05.177+07	2021-03-14 23:31:05.177+07	\N	2	\N	\N
570	BROWSER	2021-03-14 23:49:56.3+07	2021-03-14 23:49:56.3+07	\N	2	\N	\N
571	BROWSER	2021-03-14 23:55:49.414+07	2021-03-14 23:55:49.414+07	\N	2	\N	\N
572	BROWSER	2021-03-15 00:03:40.799+07	2021-03-15 00:03:40.799+07	\N	2	\N	\N
573	BROWSER	2021-03-15 00:05:50.628+07	2021-03-15 00:05:50.628+07	\N	2	\N	\N
574	BROWSER	2021-03-15 00:06:20.837+07	2021-03-15 00:06:20.837+07	\N	2	\N	\N
575	BROWSER	2021-03-15 00:16:09.326+07	2021-03-15 00:16:09.326+07	\N	27	\N	\N
576	BROWSER	2021-03-15 00:16:17.208+07	2021-03-15 00:16:17.208+07	\N	27	\N	\N
577	BROWSER	2021-03-15 00:18:48.933+07	2021-03-15 00:18:48.933+07	\N	27	\N	\N
578	BROWSER	2021-03-15 00:22:07.961+07	2021-03-15 00:22:07.961+07	\N	2	\N	\N
579	BROWSER	2021-03-15 00:22:08.768+07	2021-03-15 00:22:08.768+07	\N	27	\N	\N
580	BROWSER	2021-03-15 00:22:34.264+07	2021-03-15 00:22:34.264+07	\N	2	\N	\N
581	BROWSER	2021-03-15 00:22:39.486+07	2021-03-15 00:22:39.486+07	\N	27	\N	\N
582	BROWSER	2021-03-15 00:23:51.828+07	2021-03-15 00:23:51.828+07	\N	2	\N	\N
583	BROWSER	2021-03-15 00:23:52.95+07	2021-03-15 00:23:52.95+07	\N	27	\N	\N
584	BROWSER	2021-03-15 00:24:06.48+07	2021-03-15 00:24:06.48+07	\N	27	\N	\N
585	BROWSER	2021-03-15 00:25:52.183+07	2021-03-15 00:25:52.183+07	\N	2	\N	\N
586	BROWSER	2021-03-15 00:25:52.832+07	2021-03-15 00:25:52.832+07	\N	27	\N	\N
587	BROWSER	2021-03-15 00:26:32.406+07	2021-03-15 00:26:32.406+07	\N	2	\N	\N
588	BROWSER	2021-03-15 00:26:33.172+07	2021-03-15 00:26:33.172+07	\N	27	\N	\N
589	BROWSER	2021-03-15 00:30:37.704+07	2021-03-15 00:30:37.704+07	\N	2	\N	\N
590	BROWSER	2021-03-15 00:30:38.176+07	2021-03-15 00:30:38.176+07	\N	27	\N	\N
591	BROWSER	2021-03-15 00:31:03.616+07	2021-03-15 00:31:03.616+07	\N	27	\N	\N
592	BROWSER	2021-03-15 00:33:28.078+07	2021-03-15 00:33:28.078+07	\N	2	\N	\N
593	BROWSER	2021-03-15 00:33:28.588+07	2021-03-15 00:33:28.588+07	\N	27	\N	\N
594	BROWSER	2021-03-15 20:13:46.89+07	2021-03-15 20:13:46.89+07	\N	2	\N	\N
595	BROWSER	2021-03-15 20:23:25.339+07	2021-03-15 20:23:25.339+07	\N	2	\N	\N
596	BROWSER	2021-03-15 20:23:59.565+07	2021-03-15 20:23:59.565+07	\N	2	\N	\N
597	BROWSER	2021-03-15 20:25:03.397+07	2021-03-15 20:25:03.397+07	\N	2	\N	\N
598	BROWSER	2021-03-15 20:25:08.835+07	2021-03-15 20:25:08.835+07	\N	2	\N	\N
599	BROWSER	2021-03-15 20:25:14.374+07	2021-03-15 20:25:14.374+07	\N	2	\N	\N
600	BROWSER	2021-03-15 20:25:26.403+07	2021-03-15 20:25:26.403+07	\N	2	\N	\N
601	BROWSER	2021-03-15 20:26:21.423+07	2021-03-15 20:26:21.423+07	\N	2	\N	\N
602	BROWSER	2021-03-15 20:32:30.951+07	2021-03-15 20:32:30.951+07	\N	2	\N	\N
603	BROWSER	2021-03-15 20:33:56.271+07	2021-03-15 20:33:56.271+07	\N	2	\N	\N
604	BROWSER	2021-03-15 20:33:58.449+07	2021-03-15 20:33:58.449+07	\N	2	\N	\N
605	BROWSER	2021-03-15 20:35:02.874+07	2021-03-15 20:35:02.874+07	\N	2	\N	\N
606	BROWSER	2021-03-15 20:35:50.194+07	2021-03-15 20:35:50.194+07	\N	2	\N	\N
607	BROWSER	2021-03-15 20:35:53.049+07	2021-03-15 20:35:53.049+07	\N	2	\N	\N
608	BROWSER	2021-03-15 20:36:41.437+07	2021-03-15 20:36:41.437+07	\N	2	\N	\N
609	BROWSER	2021-03-15 20:36:53.828+07	2021-03-15 20:36:53.828+07	\N	2	\N	\N
610	BROWSER	2021-03-15 20:38:19.773+07	2021-03-15 20:38:19.773+07	\N	2	\N	\N
611	BROWSER	2021-03-15 20:38:54.654+07	2021-03-15 20:38:54.654+07	\N	2	\N	\N
612	BROWSER	2021-03-15 20:39:06.87+07	2021-03-15 20:39:06.87+07	\N	2	\N	\N
613	BROWSER	2021-03-15 20:39:15.23+07	2021-03-15 20:39:15.23+07	\N	2	\N	\N
614	BROWSER	2021-03-15 20:44:43.222+07	2021-03-15 20:44:43.222+07	\N	2	\N	\N
615	BROWSER	2021-03-15 20:45:02.284+07	2021-03-15 20:45:02.284+07	\N	2	\N	\N
616	BROWSER	2021-03-15 20:45:34.961+07	2021-03-15 20:45:34.961+07	\N	2	\N	\N
617	BROWSER	2021-03-15 20:45:58.729+07	2021-03-15 20:45:58.729+07	\N	2	\N	\N
618	BROWSER	2021-03-15 20:46:21.459+07	2021-03-15 20:46:21.459+07	\N	2	\N	\N
619	BROWSER	2021-03-15 20:46:47.058+07	2021-03-15 20:46:47.058+07	\N	2	\N	\N
620	BROWSER	2021-03-15 20:47:00.436+07	2021-03-15 20:47:00.436+07	\N	2	\N	\N
621	BROWSER	2021-03-15 20:47:50.289+07	2021-03-15 20:47:50.289+07	\N	2	\N	\N
622	BROWSER	2021-03-15 20:47:57.614+07	2021-03-15 20:47:57.614+07	\N	2	\N	\N
623	BROWSER	2021-03-15 20:48:40.861+07	2021-03-15 20:48:40.861+07	\N	2	\N	\N
624	BROWSER	2021-03-15 20:49:13.559+07	2021-03-15 20:49:13.559+07	\N	2	\N	\N
625	BROWSER	2021-03-15 20:49:29.109+07	2021-03-15 20:49:29.109+07	\N	2	\N	\N
626	BROWSER	2021-03-15 20:50:02.019+07	2021-03-15 20:50:02.019+07	\N	2	\N	\N
627	BROWSER	2021-03-15 20:50:25.511+07	2021-03-15 20:50:25.511+07	\N	2	\N	\N
628	BROWSER	2021-03-15 20:50:53.935+07	2021-03-15 20:50:53.935+07	\N	2	\N	\N
629	BROWSER	2021-03-15 20:51:34.052+07	2021-03-15 20:51:34.052+07	\N	2	\N	\N
630	BROWSER	2021-03-15 20:51:44.393+07	2021-03-15 20:51:44.393+07	\N	2	\N	\N
631	BROWSER	2021-03-15 20:51:48.611+07	2021-03-15 20:51:48.611+07	\N	2	\N	\N
632	BROWSER	2021-03-15 20:52:08.039+07	2021-03-15 20:52:08.039+07	\N	2	\N	\N
633	BROWSER	2021-03-15 20:52:38.273+07	2021-03-15 20:52:38.273+07	\N	2	\N	\N
634	BROWSER	2021-03-15 20:52:52.491+07	2021-03-15 20:52:52.491+07	\N	2	\N	\N
635	BROWSER	2021-03-15 20:53:54.941+07	2021-03-15 20:53:54.941+07	\N	2	\N	\N
636	BROWSER	2021-03-15 20:53:58.93+07	2021-03-15 20:53:58.93+07	\N	2	\N	\N
637	BROWSER	2021-03-15 20:54:23.944+07	2021-03-15 20:54:23.944+07	\N	2	\N	\N
638	BROWSER	2021-03-15 20:54:30.072+07	2021-03-15 20:54:30.072+07	\N	2	\N	\N
639	BROWSER	2021-03-15 20:55:02.114+07	2021-03-15 20:55:02.114+07	\N	2	\N	\N
640	BROWSER	2021-03-15 20:55:42.534+07	2021-03-15 20:55:42.534+07	\N	2	\N	\N
641	BROWSER	2021-03-15 20:55:55.063+07	2021-03-15 20:55:55.063+07	\N	2	\N	\N
642	BROWSER	2021-03-15 21:03:34.982+07	2021-03-15 21:03:34.982+07	\N	2	\N	\N
643	BROWSER	2021-03-15 21:05:21.245+07	2021-03-15 21:05:21.245+07	\N	2	\N	\N
644	BROWSER	2021-03-15 21:06:14.482+07	2021-03-15 21:06:14.482+07	\N	2	\N	\N
645	BROWSER	2021-03-15 21:08:50.181+07	2021-03-15 21:08:50.181+07	\N	2	\N	\N
646	BROWSER	2021-03-15 21:13:00.076+07	2021-03-15 21:13:00.076+07	\N	2	\N	\N
647	BROWSER	2021-03-15 21:14:01.495+07	2021-03-15 21:14:01.495+07	\N	2	\N	\N
648	BROWSER	2021-03-15 21:14:26.119+07	2021-03-15 21:14:26.119+07	\N	2	\N	\N
649	BROWSER	2021-03-15 21:16:09.48+07	2021-03-15 21:16:09.48+07	\N	2	\N	\N
650	BROWSER	2021-03-15 21:16:26.13+07	2021-03-15 21:16:26.13+07	\N	2	\N	\N
651	BROWSER	2021-03-15 21:19:06.501+07	2021-03-15 21:19:06.501+07	\N	2	\N	\N
652	BROWSER	2021-03-15 21:19:18.872+07	2021-03-15 21:19:18.872+07	\N	2	\N	\N
653	BROWSER	2021-03-15 21:20:49.125+07	2021-03-15 21:20:49.125+07	\N	2	\N	\N
654	BROWSER	2021-03-15 21:21:25.247+07	2021-03-15 21:21:25.247+07	\N	2	\N	\N
655	BROWSER	2021-03-15 21:21:42.809+07	2021-03-15 21:21:42.809+07	\N	2	\N	\N
656	BROWSER	2021-03-15 21:22:15.105+07	2021-03-15 21:22:15.105+07	\N	2	\N	\N
657	BROWSER	2021-03-15 21:24:15.272+07	2021-03-15 21:24:15.272+07	\N	2	\N	\N
658	BROWSER	2021-03-15 21:24:24.486+07	2021-03-15 21:24:24.486+07	\N	2	\N	\N
659	BROWSER	2021-03-15 21:30:06.4+07	2021-03-15 21:30:06.4+07	\N	2	\N	\N
660	BROWSER	2021-03-15 21:35:39.953+07	2021-03-15 21:35:39.953+07	\N	2	\N	\N
661	BROWSER	2021-03-15 21:37:43.901+07	2021-03-15 21:37:43.901+07	\N	2	\N	\N
662	BROWSER	2021-03-15 21:38:54.606+07	2021-03-15 21:38:54.606+07	\N	2	\N	\N
663	BROWSER	2021-03-15 21:39:22.632+07	2021-03-15 21:39:22.632+07	\N	2	\N	\N
664	BROWSER	2021-03-15 21:40:08.65+07	2021-03-15 21:40:08.65+07	\N	2	\N	\N
665	BROWSER	2021-03-15 21:57:08.255+07	2021-03-15 21:57:08.255+07	\N	2	\N	\N
666	BROWSER	2021-03-15 21:58:24.076+07	2021-03-15 21:58:24.076+07	\N	2	\N	\N
667	BROWSER	2021-03-15 21:58:59.254+07	2021-03-15 21:58:59.254+07	\N	2	\N	\N
668	BROWSER	2021-03-15 21:59:36.123+07	2021-03-15 21:59:36.123+07	\N	2	\N	\N
669	BROWSER	2021-03-15 22:00:26.885+07	2021-03-15 22:00:26.885+07	\N	2	\N	\N
670	BROWSER	2021-03-15 22:01:15.551+07	2021-03-15 22:01:15.551+07	\N	2	\N	\N
671	BROWSER	2021-03-15 22:02:00.185+07	2021-03-15 22:02:00.185+07	\N	2	\N	\N
672	BROWSER	2021-03-15 22:03:01.886+07	2021-03-15 22:03:01.886+07	\N	2	\N	\N
673	BROWSER	2021-03-15 22:05:04.553+07	2021-03-15 22:05:04.553+07	\N	2	\N	\N
674	BROWSER	2021-03-15 22:05:50.558+07	2021-03-15 22:05:50.558+07	\N	2	\N	\N
675	BROWSER	2021-03-15 22:06:09.129+07	2021-03-15 22:06:09.129+07	\N	2	\N	\N
676	BROWSER	2021-03-15 22:06:12.338+07	2021-03-15 22:06:12.338+07	\N	2	\N	\N
677	BROWSER	2021-03-15 22:06:30.636+07	2021-03-15 22:06:30.636+07	\N	2	\N	\N
678	BROWSER	2021-03-15 22:06:59.986+07	2021-03-15 22:06:59.986+07	\N	2	\N	\N
679	BROWSER	2021-03-15 22:07:24.295+07	2021-03-15 22:07:24.295+07	\N	2	\N	\N
680	BROWSER	2021-03-15 22:07:32.104+07	2021-03-15 22:07:32.104+07	\N	2	\N	\N
681	BROWSER	2021-03-15 22:07:41.881+07	2021-03-15 22:07:41.881+07	\N	2	\N	\N
682	BROWSER	2021-03-15 22:07:52.048+07	2021-03-15 22:07:52.048+07	\N	2	\N	\N
683	BROWSER	2021-03-15 22:08:27.06+07	2021-03-15 22:08:27.06+07	\N	24	\N	\N
684	BROWSER	2021-03-15 22:11:44.344+07	2021-03-15 22:11:44.344+07	\N	27	\N	\N
685	BROWSER	2021-03-15 22:11:54.023+07	2021-03-15 22:11:54.023+07	\N	1	\N	\N
686	BROWSER	2021-03-15 22:13:33.997+07	2021-03-15 22:13:33.997+07	\N	24	\N	\N
687	BROWSER	2021-03-15 22:13:38.394+07	2021-03-15 22:13:38.394+07	\N	1	\N	\N
688	BROWSER	2021-03-15 22:13:38.796+07	2021-03-15 22:13:38.796+07	\N	24	\N	\N
689	BROWSER	2021-03-15 22:14:01.882+07	2021-03-15 22:14:01.882+07	\N	24	\N	\N
690	BROWSER	2021-03-15 22:14:15.348+07	2021-03-15 22:14:15.348+07	\N	1	\N	\N
691	BROWSER	2021-03-15 22:14:15.715+07	2021-03-15 22:14:15.715+07	\N	24	\N	\N
692	BROWSER	2021-03-15 22:14:22.727+07	2021-03-15 22:14:22.727+07	\N	24	\N	\N
693	BROWSER	2021-03-15 22:14:41.338+07	2021-03-15 22:14:41.338+07	\N	2	\N	\N
694	BROWSER	2021-03-15 22:15:48.065+07	2021-03-15 22:15:48.065+07	\N	2	\N	\N
695	BROWSER	2021-03-15 23:22:37.329+07	2021-03-15 23:22:37.329+07	\N	2	\N	\N
696	BROWSER	2021-03-15 23:22:37.899+07	2021-03-15 23:22:37.899+07	\N	1	\N	\N
697	BROWSER	2021-03-15 23:24:12.688+07	2021-03-15 23:24:12.688+07	\N	1	\N	\N
698	BROWSER	2021-03-15 23:24:13.446+07	2021-03-15 23:24:13.446+07	\N	2	\N	\N
699	BROWSER	2021-03-15 23:24:24.376+07	2021-03-15 23:24:24.376+07	\N	1	\N	\N
700	BROWSER	2021-03-15 23:24:25.207+07	2021-03-15 23:24:25.207+07	\N	2	\N	\N
701	BROWSER	2021-03-15 23:27:24.541+07	2021-03-15 23:27:24.541+07	\N	1	\N	\N
702	BROWSER	2021-03-15 23:27:25.244+07	2021-03-15 23:27:25.244+07	\N	2	\N	\N
703	BROWSER	2021-03-15 23:27:58.106+07	2021-03-15 23:27:58.106+07	\N	1	\N	\N
704	BROWSER	2021-03-15 23:27:58.384+07	2021-03-15 23:27:58.384+07	\N	2	\N	\N
705	BROWSER	2021-03-15 23:28:55.049+07	2021-03-15 23:28:55.049+07	\N	2	\N	\N
706	BROWSER	2021-03-15 23:29:14+07	2021-03-15 23:29:14+07	\N	2	\N	\N
707	BROWSER	2021-03-15 23:29:33.793+07	2021-03-15 23:29:33.793+07	\N	2	\N	\N
708	BROWSER	2021-03-15 23:31:00.896+07	2021-03-15 23:31:00.896+07	\N	2	\N	\N
709	BROWSER	2021-03-15 23:31:07.658+07	2021-03-15 23:31:07.658+07	\N	2	\N	\N
710	BROWSER	2021-03-15 23:32:00.452+07	2021-03-15 23:32:00.452+07	\N	2	\N	\N
711	BROWSER	2021-03-15 23:32:09.038+07	2021-03-15 23:32:09.038+07	\N	2	\N	\N
712	BROWSER	2021-03-15 23:32:57.8+07	2021-03-15 23:32:57.8+07	\N	2	\N	\N
713	BROWSER	2021-03-15 23:33:17.039+07	2021-03-15 23:33:17.039+07	\N	2	\N	\N
714	BROWSER	2021-03-15 23:33:51.111+07	2021-03-15 23:33:51.111+07	\N	2	\N	\N
715	BROWSER	2021-03-15 23:35:19.072+07	2021-03-15 23:35:19.072+07	\N	2	\N	\N
716	BROWSER	2021-03-15 23:35:37.041+07	2021-03-15 23:35:37.041+07	\N	2	\N	\N
717	BROWSER	2021-03-15 23:36:02.722+07	2021-03-15 23:36:02.722+07	\N	2	\N	\N
718	BROWSER	2021-03-15 23:36:26.196+07	2021-03-15 23:36:26.196+07	\N	2	\N	\N
719	BROWSER	2021-03-15 23:37:28.051+07	2021-03-15 23:37:28.051+07	\N	2	\N	\N
720	BROWSER	2021-03-15 23:37:33.182+07	2021-03-15 23:37:33.182+07	\N	2	\N	\N
721	BROWSER	2021-03-15 23:38:13.057+07	2021-03-15 23:38:13.057+07	\N	2	\N	\N
722	BROWSER	2021-03-15 23:43:08.834+07	2021-03-15 23:43:08.834+07	\N	2	\N	\N
723	BROWSER	2021-03-15 23:43:35.616+07	2021-03-15 23:43:35.616+07	\N	2	\N	\N
724	BROWSER	2021-03-15 23:44:16.297+07	2021-03-15 23:44:16.297+07	\N	26	\N	\N
725	BROWSER	2021-03-15 23:46:29.135+07	2021-03-15 23:46:29.135+07	\N	2	\N	\N
726	BROWSER	2021-03-15 23:48:23.589+07	2021-03-15 23:48:23.589+07	\N	2	\N	\N
727	BROWSER	2021-03-15 23:48:59.555+07	2021-03-15 23:48:59.555+07	\N	2	\N	\N
728	BROWSER	2021-03-15 23:51:15.196+07	2021-03-15 23:51:15.196+07	\N	2	\N	\N
729	BROWSER	2021-03-15 23:52:28.413+07	2021-03-15 23:52:28.413+07	\N	2	\N	\N
730	BROWSER	2021-03-15 23:53:05.843+07	2021-03-15 23:53:05.843+07	\N	2	\N	\N
731	BROWSER	2021-03-15 23:54:12.067+07	2021-03-15 23:54:12.067+07	\N	2	\N	\N
732	BROWSER	2021-03-15 23:54:58.647+07	2021-03-15 23:54:58.647+07	\N	2	\N	\N
733	BROWSER	2021-03-15 23:57:50.484+07	2021-03-15 23:57:50.484+07	\N	26	\N	\N
734	BROWSER	2021-03-15 23:57:52.196+07	2021-03-15 23:57:52.196+07	\N	2	\N	\N
735	BROWSER	2021-03-15 23:58:30.767+07	2021-03-15 23:58:30.767+07	\N	2	\N	\N
736	BROWSER	2021-03-15 23:58:50.557+07	2021-03-15 23:58:50.557+07	\N	2	\N	\N
737	BROWSER	2021-03-16 00:02:32.047+07	2021-03-16 00:02:32.047+07	\N	2	\N	\N
738	BROWSER	2021-03-16 00:03:25.184+07	2021-03-16 00:03:25.184+07	\N	2	\N	\N
739	BROWSER	2021-03-16 00:06:05.841+07	2021-03-16 00:06:05.841+07	\N	2	\N	\N
740	BROWSER	2021-03-16 00:06:30.397+07	2021-03-16 00:06:30.397+07	\N	2	\N	\N
741	BROWSER	2021-03-16 00:07:05.35+07	2021-03-16 00:07:05.35+07	\N	2	\N	\N
742	BROWSER	2021-03-16 00:07:30.884+07	2021-03-16 00:07:30.884+07	\N	2	\N	\N
743	BROWSER	2021-03-16 00:09:24.642+07	2021-03-16 00:09:24.642+07	\N	2	\N	\N
744	BROWSER	2021-03-16 00:11:22.518+07	2021-03-16 00:11:22.518+07	\N	2	\N	\N
745	BROWSER	2021-03-16 00:12:55.776+07	2021-03-16 00:12:55.776+07	\N	2	\N	\N
746	BROWSER	2021-03-16 20:40:06.281+07	2021-03-16 20:40:06.281+07	\N	2	\N	\N
747	BROWSER	2021-03-16 20:42:17.135+07	2021-03-16 20:42:17.135+07	\N	2	\N	\N
748	BROWSER	2021-03-16 20:50:11.356+07	2021-03-16 20:50:11.356+07	\N	2	\N	\N
749	BROWSER	2021-03-16 20:51:09.395+07	2021-03-16 20:51:09.395+07	\N	2	\N	\N
750	BROWSER	2021-03-16 20:51:16.231+07	2021-03-16 20:51:16.231+07	\N	2	\N	\N
751	BROWSER	2021-03-16 20:52:38.879+07	2021-03-16 20:52:38.879+07	\N	2	\N	\N
752	BROWSER	2021-03-16 20:52:51.332+07	2021-03-16 20:52:51.332+07	\N	2	\N	\N
753	BROWSER	2021-03-16 20:53:04.412+07	2021-03-16 20:53:04.412+07	\N	2	\N	\N
754	BROWSER	2021-03-16 20:55:36.522+07	2021-03-16 20:55:36.522+07	\N	2	\N	\N
755	BROWSER	2021-03-16 20:56:19.261+07	2021-03-16 20:56:19.261+07	\N	2	\N	\N
756	BROWSER	2021-03-16 20:57:10.566+07	2021-03-16 20:57:10.566+07	\N	2	\N	\N
757	BROWSER	2021-03-16 21:00:28.56+07	2021-03-16 21:00:28.56+07	\N	2	\N	\N
758	BROWSER	2021-03-16 21:01:17.008+07	2021-03-16 21:01:17.008+07	\N	2	\N	\N
759	BROWSER	2021-03-16 21:01:33.873+07	2021-03-16 21:01:33.873+07	\N	2	\N	\N
760	BROWSER	2021-03-16 21:02:41.119+07	2021-03-16 21:02:41.119+07	\N	2	\N	\N
761	BROWSER	2021-03-16 21:03:03.746+07	2021-03-16 21:03:03.746+07	\N	2	\N	\N
762	BROWSER	2021-03-16 21:04:40.289+07	2021-03-16 21:04:40.289+07	\N	2	\N	\N
763	BROWSER	2021-03-16 21:05:18.137+07	2021-03-16 21:05:18.137+07	\N	2	\N	\N
764	BROWSER	2021-03-16 21:07:17.067+07	2021-03-16 21:07:17.067+07	\N	2	\N	\N
765	BROWSER	2021-03-16 21:07:32.412+07	2021-03-16 21:07:32.412+07	\N	2	\N	\N
766	BROWSER	2021-03-16 21:08:23.482+07	2021-03-16 21:08:23.482+07	\N	2	\N	\N
767	BROWSER	2021-03-16 21:08:42.667+07	2021-03-16 21:08:42.667+07	\N	2	\N	\N
768	BROWSER	2021-03-16 21:12:41.864+07	2021-03-16 21:12:41.864+07	\N	2	\N	\N
769	BROWSER	2021-03-16 21:12:57.957+07	2021-03-16 21:12:57.957+07	\N	2	\N	\N
770	BROWSER	2021-03-16 21:13:19.992+07	2021-03-16 21:13:19.992+07	\N	2	\N	\N
771	BROWSER	2021-03-16 21:18:55.802+07	2021-03-16 21:18:55.802+07	\N	2	\N	\N
772	BROWSER	2021-03-16 21:19:04.868+07	2021-03-16 21:19:04.868+07	\N	2	\N	\N
773	BROWSER	2021-03-16 21:19:44.859+07	2021-03-16 21:19:44.859+07	\N	2	\N	\N
774	BROWSER	2021-03-16 21:19:53.804+07	2021-03-16 21:19:53.804+07	\N	2	\N	\N
775	BROWSER	2021-03-16 21:20:16.108+07	2021-03-16 21:20:16.108+07	\N	2	\N	\N
776	BROWSER	2021-03-16 21:20:41.461+07	2021-03-16 21:20:41.461+07	\N	2	\N	\N
777	BROWSER	2021-03-16 21:21:03.272+07	2021-03-16 21:21:03.272+07	\N	2	\N	\N
778	BROWSER	2021-03-16 21:21:41.267+07	2021-03-16 21:21:41.267+07	\N	2	\N	\N
779	BROWSER	2021-03-16 21:22:07.346+07	2021-03-16 21:22:07.346+07	\N	2	\N	\N
780	BROWSER	2021-03-16 21:22:25.148+07	2021-03-16 21:22:25.148+07	\N	2	\N	\N
781	BROWSER	2021-03-16 21:26:12.796+07	2021-03-16 21:26:12.796+07	\N	2	\N	\N
782	BROWSER	2021-03-16 21:26:32.428+07	2021-03-16 21:26:32.428+07	\N	2	\N	\N
783	BROWSER	2021-03-16 21:26:39.774+07	2021-03-16 21:26:39.774+07	\N	2	\N	\N
784	BROWSER	2021-03-16 21:27:08.022+07	2021-03-16 21:27:08.022+07	\N	2	\N	\N
785	BROWSER	2021-03-16 21:27:19.912+07	2021-03-16 21:27:19.912+07	\N	2	\N	\N
786	BROWSER	2021-03-16 21:27:27.774+07	2021-03-16 21:27:27.774+07	\N	2	\N	\N
787	BROWSER	2021-03-16 21:28:19.768+07	2021-03-16 21:28:19.768+07	\N	2	\N	\N
788	BROWSER	2021-03-16 21:28:28.811+07	2021-03-16 21:28:28.811+07	\N	2	\N	\N
789	BROWSER	2021-03-16 21:28:37.012+07	2021-03-16 21:28:37.012+07	\N	2	\N	\N
790	BROWSER	2021-03-16 21:28:42.336+07	2021-03-16 21:28:42.336+07	\N	2	\N	\N
791	BROWSER	2021-03-16 21:28:58.082+07	2021-03-16 21:28:58.082+07	\N	2	\N	\N
792	BROWSER	2021-03-16 21:30:46.681+07	2021-03-16 21:30:46.681+07	\N	2	\N	\N
793	BROWSER	2021-03-16 21:43:31.732+07	2021-03-16 21:43:31.732+07	\N	2	\N	\N
794	BROWSER	2021-03-16 21:43:52.48+07	2021-03-16 21:43:52.48+07	\N	2	\N	\N
795	BROWSER	2021-03-16 21:44:11.491+07	2021-03-16 21:44:11.491+07	\N	2	\N	\N
796	BROWSER	2021-03-16 21:45:05.603+07	2021-03-16 21:45:05.603+07	\N	2	\N	\N
797	BROWSER	2021-03-16 21:47:39.297+07	2021-03-16 21:47:39.297+07	\N	2	\N	\N
798	BROWSER	2021-03-16 21:50:26.829+07	2021-03-16 21:50:26.829+07	\N	2	\N	\N
799	BROWSER	2021-03-16 21:50:34.983+07	2021-03-16 21:50:34.983+07	\N	2	\N	\N
800	BROWSER	2021-03-16 21:51:19.902+07	2021-03-16 21:51:19.902+07	\N	2	\N	\N
801	BROWSER	2021-03-16 21:51:33.905+07	2021-03-16 21:51:33.905+07	\N	2	\N	\N
802	BROWSER	2021-03-16 21:51:54.94+07	2021-03-16 21:51:54.94+07	\N	2	\N	\N
803	BROWSER	2021-03-16 21:52:20.277+07	2021-03-16 21:52:20.277+07	\N	2	\N	\N
804	BROWSER	2021-03-16 21:53:47.904+07	2021-03-16 21:53:47.904+07	\N	2	\N	\N
805	BROWSER	2021-03-16 21:54:51.772+07	2021-03-16 21:54:51.772+07	\N	2	\N	\N
806	BROWSER	2021-03-16 21:55:07.662+07	2021-03-16 21:55:07.662+07	\N	2	\N	\N
807	BROWSER	2021-03-16 21:55:31.744+07	2021-03-16 21:55:31.744+07	\N	2	\N	\N
808	BROWSER	2021-03-16 21:56:17.564+07	2021-03-16 21:56:17.564+07	\N	2	\N	\N
809	BROWSER	2021-03-16 21:57:14.019+07	2021-03-16 21:57:14.019+07	\N	2	\N	\N
810	BROWSER	2021-03-16 21:59:18.967+07	2021-03-16 21:59:18.967+07	\N	2	\N	\N
811	BROWSER	2021-03-16 21:59:36.235+07	2021-03-16 21:59:36.235+07	\N	2	\N	\N
812	BROWSER	2021-03-16 21:59:43.496+07	2021-03-16 21:59:43.496+07	\N	2	\N	\N
813	BROWSER	2021-03-16 22:00:53.634+07	2021-03-16 22:00:53.634+07	\N	2	\N	\N
814	BROWSER	2021-03-16 22:01:11.482+07	2021-03-16 22:01:11.482+07	\N	2	\N	\N
815	BROWSER	2021-03-16 22:01:16.819+07	2021-03-16 22:01:16.819+07	\N	2	\N	\N
816	BROWSER	2021-03-16 22:05:14.465+07	2021-03-16 22:05:14.465+07	\N	2	\N	\N
817	BROWSER	2021-03-16 22:07:47.098+07	2021-03-16 22:07:47.098+07	\N	2	\N	\N
818	BROWSER	2021-03-16 22:08:29.432+07	2021-03-16 22:08:29.432+07	\N	2	\N	\N
819	BROWSER	2021-03-16 22:08:46.398+07	2021-03-16 22:08:46.398+07	\N	2	\N	\N
820	BROWSER	2021-03-16 22:22:52.307+07	2021-03-16 22:22:52.307+07	\N	2	\N	\N
821	BROWSER	2021-03-16 22:24:58.64+07	2021-03-16 22:24:58.64+07	\N	2	\N	\N
822	BROWSER	2021-03-16 22:30:07.073+07	2021-03-16 22:30:07.073+07	\N	2	\N	\N
823	BROWSER	2021-03-16 22:31:13.094+07	2021-03-16 22:31:13.094+07	\N	2	\N	\N
824	BROWSER	2021-03-16 22:32:47.734+07	2021-03-16 22:32:47.734+07	\N	2	\N	\N
825	BROWSER	2021-03-16 22:34:12.139+07	2021-03-16 22:34:12.139+07	\N	2	\N	\N
826	BROWSER	2021-03-16 22:36:21.967+07	2021-03-16 22:36:21.967+07	\N	2	\N	\N
827	BROWSER	2021-03-16 22:44:31.63+07	2021-03-16 22:44:31.63+07	\N	2	\N	\N
828	BROWSER	2021-03-16 22:44:43.88+07	2021-03-16 22:44:43.88+07	\N	2	\N	\N
829	BROWSER	2021-03-16 22:45:20.312+07	2021-03-16 22:45:20.312+07	\N	2	\N	\N
830	BROWSER	2021-03-16 22:47:01.279+07	2021-03-16 22:47:01.279+07	\N	2	\N	\N
831	BROWSER	2021-03-16 22:48:16.121+07	2021-03-16 22:48:16.121+07	\N	2	\N	\N
832	BROWSER	2021-03-16 22:50:15.891+07	2021-03-16 22:50:15.891+07	\N	2	\N	\N
833	BROWSER	2021-03-16 22:50:28.283+07	2021-03-16 22:50:28.283+07	\N	2	\N	\N
834	BROWSER	2021-03-16 22:50:55.354+07	2021-03-16 22:50:55.354+07	\N	2	\N	\N
835	BROWSER	2021-03-16 22:52:34.09+07	2021-03-16 22:52:34.09+07	\N	2	\N	\N
836	BROWSER	2021-03-16 22:53:06.309+07	2021-03-16 22:53:06.309+07	\N	2	\N	\N
837	BROWSER	2021-03-16 22:55:49.119+07	2021-03-16 22:55:49.119+07	\N	2	\N	\N
838	BROWSER	2021-03-16 22:55:58.912+07	2021-03-16 22:55:58.912+07	\N	2	\N	\N
839	BROWSER	2021-03-16 23:01:04.057+07	2021-03-16 23:01:04.057+07	\N	2	\N	\N
840	BROWSER	2021-03-16 23:01:49.916+07	2021-03-16 23:01:49.916+07	\N	2	\N	\N
841	BROWSER	2021-03-16 23:06:09.534+07	2021-03-16 23:06:09.534+07	\N	2	\N	\N
842	BROWSER	2021-03-16 23:09:29.531+07	2021-03-16 23:09:29.531+07	\N	2	\N	\N
843	BROWSER	2021-03-16 23:12:19.651+07	2021-03-16 23:12:19.651+07	\N	2	\N	\N
844	BROWSER	2021-03-16 23:12:46.94+07	2021-03-16 23:12:46.94+07	\N	2	\N	\N
845	BROWSER	2021-03-16 23:13:15.787+07	2021-03-16 23:13:15.787+07	\N	2	\N	\N
846	BROWSER	2021-03-16 23:13:26.661+07	2021-03-16 23:13:26.661+07	\N	2	\N	\N
847	BROWSER	2021-03-16 23:14:08.018+07	2021-03-16 23:14:08.018+07	\N	2	\N	\N
848	BROWSER	2021-03-16 23:15:04.636+07	2021-03-16 23:15:04.636+07	\N	2	\N	\N
849	BROWSER	2021-03-16 23:16:03.607+07	2021-03-16 23:16:03.607+07	\N	2	\N	\N
850	BROWSER	2021-03-16 23:16:25.67+07	2021-03-16 23:16:25.67+07	\N	2	\N	\N
851	BROWSER	2021-03-16 23:17:39.19+07	2021-03-16 23:17:39.19+07	\N	2	\N	\N
852	BROWSER	2021-03-16 23:17:56.904+07	2021-03-16 23:17:56.904+07	\N	2	\N	\N
853	BROWSER	2021-03-16 23:23:50.374+07	2021-03-16 23:23:50.374+07	\N	2	\N	\N
854	BROWSER	2021-03-16 23:24:33.161+07	2021-03-16 23:24:33.161+07	\N	2	\N	\N
855	BROWSER	2021-03-16 23:24:50.572+07	2021-03-16 23:24:50.572+07	\N	2	\N	\N
856	BROWSER	2021-03-16 23:25:13.53+07	2021-03-16 23:25:13.53+07	\N	2	\N	\N
857	BROWSER	2021-03-16 23:25:25.44+07	2021-03-16 23:25:25.44+07	\N	2	\N	\N
858	BROWSER	2021-03-16 23:26:56.442+07	2021-03-16 23:26:56.442+07	\N	2	\N	\N
859	BROWSER	2021-03-16 23:30:03.582+07	2021-03-16 23:30:03.582+07	\N	2	\N	\N
860	BROWSER	2021-03-16 23:30:35.809+07	2021-03-16 23:30:35.809+07	\N	2	\N	\N
861	BROWSER	2021-03-16 23:31:20.521+07	2021-03-16 23:31:20.521+07	\N	2	\N	\N
862	BROWSER	2021-03-16 23:31:56.787+07	2021-03-16 23:31:56.787+07	\N	2	\N	\N
863	BROWSER	2021-03-16 23:32:27.141+07	2021-03-16 23:32:27.141+07	\N	2	\N	\N
864	BROWSER	2021-03-16 23:32:38.176+07	2021-03-16 23:32:38.176+07	\N	2	\N	\N
865	BROWSER	2021-03-16 23:33:25.018+07	2021-03-16 23:33:25.018+07	\N	2	\N	\N
866	BROWSER	2021-03-16 23:33:36.55+07	2021-03-16 23:33:36.55+07	\N	2	\N	\N
867	BROWSER	2021-03-16 23:34:15.31+07	2021-03-16 23:34:15.31+07	\N	2	\N	\N
868	BROWSER	2021-03-16 23:37:25.292+07	2021-03-16 23:37:25.292+07	\N	2	\N	\N
869	BROWSER	2021-03-16 23:38:23.191+07	2021-03-16 23:38:23.191+07	\N	2	\N	\N
870	BROWSER	2021-03-16 23:39:35.639+07	2021-03-16 23:39:35.639+07	\N	2	\N	\N
871	BROWSER	2021-03-16 23:39:58.63+07	2021-03-16 23:39:58.63+07	\N	2	\N	\N
872	BROWSER	2021-03-16 23:40:03.722+07	2021-03-16 23:40:03.722+07	\N	2	\N	\N
873	BROWSER	2021-03-16 23:41:11.054+07	2021-03-16 23:41:11.054+07	\N	2	\N	\N
874	BROWSER	2021-03-16 23:41:55.214+07	2021-03-16 23:41:55.214+07	\N	2	\N	\N
875	BROWSER	2021-03-16 23:44:00.777+07	2021-03-16 23:44:00.777+07	\N	2	\N	\N
876	BROWSER	2021-03-16 23:44:43.943+07	2021-03-16 23:44:43.943+07	\N	2	\N	\N
877	BROWSER	2021-03-16 23:44:59.999+07	2021-03-16 23:44:59.999+07	\N	2	\N	\N
878	BROWSER	2021-03-16 23:45:54.755+07	2021-03-16 23:45:54.755+07	\N	2	\N	\N
879	BROWSER	2021-03-16 23:46:24.292+07	2021-03-16 23:46:24.292+07	\N	2	\N	\N
880	BROWSER	2021-03-16 23:46:54.248+07	2021-03-16 23:46:54.248+07	\N	2	\N	\N
881	BROWSER	2021-03-16 23:47:26.025+07	2021-03-16 23:47:26.025+07	\N	2	\N	\N
882	BROWSER	2021-03-16 23:48:23.157+07	2021-03-16 23:48:23.157+07	\N	2	\N	\N
883	BROWSER	2021-03-16 23:49:30.165+07	2021-03-16 23:49:30.165+07	\N	2	\N	\N
884	BROWSER	2021-03-16 23:50:18.575+07	2021-03-16 23:50:18.575+07	\N	2	\N	\N
885	BROWSER	2021-03-16 23:51:03.814+07	2021-03-16 23:51:03.814+07	\N	2	\N	\N
886	BROWSER	2021-03-16 23:51:50.959+07	2021-03-16 23:51:50.959+07	\N	2	\N	\N
887	BROWSER	2021-03-16 23:52:30.443+07	2021-03-16 23:52:30.443+07	\N	2	\N	\N
888	BROWSER	2021-03-16 23:53:51.719+07	2021-03-16 23:53:51.719+07	\N	2	\N	\N
889	BROWSER	2021-03-16 23:54:04.184+07	2021-03-16 23:54:04.184+07	\N	2	\N	\N
890	BROWSER	2021-03-16 23:54:36.894+07	2021-03-16 23:54:36.894+07	\N	2	\N	\N
891	BROWSER	2021-03-16 23:55:05.71+07	2021-03-16 23:55:05.71+07	\N	2	\N	\N
892	BROWSER	2021-03-16 23:55:18.206+07	2021-03-16 23:55:18.206+07	\N	2	\N	\N
893	BROWSER	2021-03-16 23:55:51.95+07	2021-03-16 23:55:51.95+07	\N	2	\N	\N
894	BROWSER	2021-03-16 23:58:18.467+07	2021-03-16 23:58:18.467+07	\N	2	\N	\N
895	BROWSER	2021-03-17 00:00:08.473+07	2021-03-17 00:00:08.473+07	\N	2	\N	\N
896	BROWSER	2021-03-17 00:01:05.932+07	2021-03-17 00:01:05.932+07	\N	2	\N	\N
897	BROWSER	2021-03-17 00:01:21.857+07	2021-03-17 00:01:21.857+07	\N	2	\N	\N
898	BROWSER	2021-03-17 00:04:10.42+07	2021-03-17 00:04:10.42+07	\N	2	\N	\N
899	BROWSER	2021-03-17 00:04:35.474+07	2021-03-17 00:04:35.474+07	\N	2	\N	\N
900	BROWSER	2021-03-17 00:06:40.819+07	2021-03-17 00:06:40.819+07	\N	2	\N	\N
901	BROWSER	2021-03-17 00:07:38.292+07	2021-03-17 00:07:38.292+07	\N	2	\N	\N
902	BROWSER	2021-03-17 00:10:36.356+07	2021-03-17 00:10:36.356+07	\N	2	\N	\N
903	BROWSER	2021-03-17 00:12:32.747+07	2021-03-17 00:12:32.747+07	\N	2	\N	\N
904	BROWSER	2021-03-17 00:12:51.884+07	2021-03-17 00:12:51.884+07	\N	2	\N	\N
905	BROWSER	2021-03-17 22:34:23.701+07	2021-03-17 22:34:23.701+07	\N	2	\N	\N
906	BROWSER	2021-03-17 22:34:50.992+07	2021-03-17 22:34:50.992+07	\N	2	\N	\N
907	BROWSER	2021-03-17 22:35:22.92+07	2021-03-17 22:35:22.92+07	\N	2	\N	\N
908	BROWSER	2021-03-17 22:35:37.143+07	2021-03-17 22:35:37.143+07	\N	2	\N	\N
909	BROWSER	2021-03-17 22:36:04.99+07	2021-03-17 22:36:04.99+07	\N	2	\N	\N
910	BROWSER	2021-03-17 22:37:18.574+07	2021-03-17 22:37:18.574+07	\N	2	\N	\N
911	BROWSER	2021-03-17 22:37:31.857+07	2021-03-17 22:37:31.857+07	\N	2	\N	\N
912	BROWSER	2021-03-17 22:38:11.794+07	2021-03-17 22:38:11.794+07	\N	2	\N	\N
913	BROWSER	2021-03-17 22:39:46.72+07	2021-03-17 22:39:46.72+07	\N	2	\N	\N
914	BROWSER	2021-03-17 22:40:24.323+07	2021-03-17 22:40:24.323+07	\N	2	\N	\N
915	BROWSER	2021-03-17 22:41:16.131+07	2021-03-17 22:41:16.131+07	\N	2	\N	\N
916	BROWSER	2021-03-17 22:41:28.208+07	2021-03-17 22:41:28.208+07	\N	2	\N	\N
917	BROWSER	2021-03-17 22:42:01.188+07	2021-03-17 22:42:01.188+07	\N	2	\N	\N
918	BROWSER	2021-03-17 22:42:59.866+07	2021-03-17 22:42:59.866+07	\N	2	\N	\N
919	BROWSER	2021-03-17 22:43:27.933+07	2021-03-17 22:43:27.933+07	\N	2	\N	\N
920	BROWSER	2021-03-17 22:43:36.534+07	2021-03-17 22:43:36.534+07	\N	2	\N	\N
921	BROWSER	2021-03-17 22:45:35.927+07	2021-03-17 22:45:35.927+07	\N	2	\N	\N
922	BROWSER	2021-03-17 22:46:06.318+07	2021-03-17 22:46:06.318+07	\N	2	\N	\N
923	BROWSER	2021-03-17 22:46:15.354+07	2021-03-17 22:46:15.354+07	\N	2	\N	\N
924	BROWSER	2021-03-17 22:46:53.252+07	2021-03-17 22:46:53.252+07	\N	2	\N	\N
925	BROWSER	2021-03-17 22:47:09.88+07	2021-03-17 22:47:09.88+07	\N	2	\N	\N
926	BROWSER	2021-03-17 22:47:16.848+07	2021-03-17 22:47:16.848+07	\N	2	\N	\N
927	BROWSER	2021-03-17 22:49:20.166+07	2021-03-17 22:49:20.166+07	\N	2	\N	\N
928	BROWSER	2021-03-17 22:51:41.34+07	2021-03-17 22:51:41.34+07	\N	2	\N	\N
929	BROWSER	2021-03-17 22:52:14.013+07	2021-03-17 22:52:14.013+07	\N	2	\N	\N
930	BROWSER	2021-03-17 22:54:26.978+07	2021-03-17 22:54:26.978+07	\N	2	\N	\N
931	BROWSER	2021-03-17 22:55:01.133+07	2021-03-17 22:55:01.133+07	\N	2	\N	\N
932	BROWSER	2021-03-17 22:56:32.237+07	2021-03-17 22:56:32.237+07	\N	2	\N	\N
933	BROWSER	2021-03-17 22:57:36.149+07	2021-03-17 22:57:36.149+07	\N	2	\N	\N
934	BROWSER	2021-03-17 23:00:11.334+07	2021-03-17 23:00:11.334+07	\N	2	\N	\N
935	BROWSER	2021-03-17 23:01:40.256+07	2021-03-17 23:01:40.256+07	\N	2	\N	\N
936	BROWSER	2021-03-17 23:02:51.933+07	2021-03-17 23:02:51.933+07	\N	2	\N	\N
937	BROWSER	2021-03-17 23:06:36.114+07	2021-03-17 23:06:36.114+07	\N	2	\N	\N
938	BROWSER	2021-03-17 23:08:37.931+07	2021-03-17 23:08:37.931+07	\N	2	\N	\N
939	BROWSER	2021-03-17 23:10:37.745+07	2021-03-17 23:10:37.745+07	\N	2	\N	\N
940	BROWSER	2021-03-17 23:11:46.647+07	2021-03-17 23:11:46.647+07	\N	2	\N	\N
941	BROWSER	2021-03-17 23:12:34.997+07	2021-03-17 23:12:34.997+07	\N	2	\N	\N
942	BROWSER	2021-03-17 23:13:11.947+07	2021-03-17 23:13:11.947+07	\N	2	\N	\N
943	BROWSER	2021-03-17 23:14:15.203+07	2021-03-17 23:14:15.203+07	\N	2	\N	\N
944	BROWSER	2021-03-17 23:15:39.777+07	2021-03-17 23:15:39.777+07	\N	2	\N	\N
945	BROWSER	2021-03-17 23:16:02.104+07	2021-03-17 23:16:02.104+07	\N	2	\N	\N
946	BROWSER	2021-03-17 23:16:28.551+07	2021-03-17 23:16:28.551+07	\N	2	\N	\N
947	BROWSER	2021-03-17 23:16:45.69+07	2021-03-17 23:16:45.69+07	\N	2	\N	\N
948	BROWSER	2021-03-17 23:17:16.917+07	2021-03-17 23:17:16.917+07	\N	2	\N	\N
949	BROWSER	2021-03-17 23:20:57.242+07	2021-03-17 23:20:57.242+07	\N	2	\N	\N
950	BROWSER	2021-03-17 23:21:23.826+07	2021-03-17 23:21:23.826+07	\N	2	\N	\N
951	BROWSER	2021-03-17 23:24:04.351+07	2021-03-17 23:24:04.351+07	\N	2	\N	\N
952	BROWSER	2021-03-17 23:27:38.51+07	2021-03-17 23:27:38.51+07	\N	2	\N	\N
953	BROWSER	2021-03-17 23:27:49.853+07	2021-03-17 23:27:49.853+07	\N	2	\N	\N
954	BROWSER	2021-03-17 23:28:05.833+07	2021-03-17 23:28:05.833+07	\N	2	\N	\N
955	BROWSER	2021-03-17 23:31:34.559+07	2021-03-17 23:31:34.559+07	\N	2	\N	\N
956	BROWSER	2021-03-17 23:32:14.508+07	2021-03-17 23:32:14.508+07	\N	2	\N	\N
957	BROWSER	2021-03-17 23:32:27.232+07	2021-03-17 23:32:27.232+07	\N	2	\N	\N
958	BROWSER	2021-03-17 23:32:45.157+07	2021-03-17 23:32:45.157+07	\N	2	\N	\N
959	BROWSER	2021-03-17 23:32:58.059+07	2021-03-17 23:32:58.059+07	\N	2	\N	\N
960	BROWSER	2021-03-17 23:33:04.612+07	2021-03-17 23:33:04.612+07	\N	2	\N	\N
961	BROWSER	2021-03-17 23:35:19.833+07	2021-03-17 23:35:19.833+07	\N	2	\N	\N
962	BROWSER	2021-03-17 23:35:44.441+07	2021-03-17 23:35:44.441+07	\N	2	\N	\N
963	BROWSER	2021-03-17 23:35:58.382+07	2021-03-17 23:35:58.382+07	\N	2	\N	\N
964	BROWSER	2021-03-17 23:36:07.533+07	2021-03-17 23:36:07.533+07	\N	2	\N	\N
965	BROWSER	2021-03-17 23:36:56.628+07	2021-03-17 23:36:56.628+07	\N	2	\N	\N
966	BROWSER	2021-03-17 23:37:43.708+07	2021-03-17 23:37:43.708+07	\N	2	\N	\N
967	BROWSER	2021-03-17 23:37:50.979+07	2021-03-17 23:37:50.979+07	\N	2	\N	\N
968	BROWSER	2021-03-18 20:18:53.971+07	2021-03-18 20:18:53.971+07	\N	2	\N	\N
969	BROWSER	2021-03-18 20:21:55.025+07	2021-03-18 20:21:55.025+07	\N	2	\N	\N
970	BROWSER	2021-03-18 20:22:14.365+07	2021-03-18 20:22:14.365+07	\N	2	\N	\N
971	BROWSER	2021-03-18 20:27:27.612+07	2021-03-18 20:27:27.612+07	\N	2	\N	\N
972	BROWSER	2021-03-18 20:27:35.815+07	2021-03-18 20:27:35.815+07	\N	2	\N	\N
973	BROWSER	2021-03-18 20:28:56.397+07	2021-03-18 20:28:56.397+07	\N	2	\N	\N
974	BROWSER	2021-03-18 20:29:23.854+07	2021-03-18 20:29:23.854+07	\N	2	\N	\N
975	BROWSER	2021-03-18 20:32:03.286+07	2021-03-18 20:32:03.286+07	\N	2	\N	\N
976	BROWSER	2021-03-18 20:34:45.423+07	2021-03-18 20:34:45.423+07	\N	2	\N	\N
977	BROWSER	2021-03-18 20:35:03.747+07	2021-03-18 20:35:03.747+07	\N	2	\N	\N
978	BROWSER	2021-03-18 20:35:20.293+07	2021-03-18 20:35:20.293+07	\N	2	\N	\N
979	BROWSER	2021-03-18 20:35:37.264+07	2021-03-18 20:35:37.264+07	\N	2	\N	\N
980	BROWSER	2021-03-18 20:36:07.129+07	2021-03-18 20:36:07.129+07	\N	2	\N	\N
981	BROWSER	2021-03-19 22:58:24.959+07	2021-03-19 22:58:24.959+07	\N	2	\N	\N
982	BROWSER	2021-03-19 23:00:48.323+07	2021-03-19 23:00:48.323+07	\N	2	\N	\N
983	BROWSER	2021-03-19 23:02:15.469+07	2021-03-19 23:02:15.469+07	\N	2	\N	\N
984	BROWSER	2021-03-19 23:02:42.245+07	2021-03-19 23:02:42.245+07	\N	2	\N	\N
985	BROWSER	2021-03-19 23:04:05.889+07	2021-03-19 23:04:05.889+07	\N	2	\N	\N
986	BROWSER	2021-03-19 23:13:28.503+07	2021-03-19 23:13:28.503+07	\N	2	\N	\N
987	BROWSER	2021-03-19 23:15:01.355+07	2021-03-19 23:15:01.355+07	\N	2	\N	\N
988	BROWSER	2021-03-19 23:17:12.843+07	2021-03-19 23:17:12.843+07	\N	2	\N	\N
989	BROWSER	2021-03-19 23:18:38.352+07	2021-03-19 23:18:38.352+07	\N	2	\N	\N
990	BROWSER	2021-03-19 23:18:48.519+07	2021-03-19 23:18:48.519+07	\N	2	\N	\N
991	BROWSER	2021-03-19 23:22:00.871+07	2021-03-19 23:22:00.871+07	\N	2	\N	\N
992	BROWSER	2021-03-19 23:27:53.159+07	2021-03-19 23:27:53.159+07	\N	2	\N	\N
993	BROWSER	2021-03-19 23:28:23.429+07	2021-03-19 23:28:23.429+07	\N	2	\N	\N
994	BROWSER	2021-03-19 23:29:48.539+07	2021-03-19 23:29:48.539+07	\N	2	\N	\N
995	BROWSER	2021-03-19 23:29:53.006+07	2021-03-19 23:29:53.006+07	\N	2	\N	\N
996	BROWSER	2021-03-19 23:30:56.329+07	2021-03-19 23:30:56.329+07	\N	2	\N	\N
997	BROWSER	2021-03-19 23:31:41.953+07	2021-03-19 23:31:41.953+07	\N	2	\N	\N
998	BROWSER	2021-03-19 23:32:39.455+07	2021-03-19 23:32:39.455+07	\N	2	\N	\N
999	BROWSER	2021-03-19 23:34:20.061+07	2021-03-19 23:34:20.061+07	\N	2	\N	\N
1000	BROWSER	2021-03-19 23:48:48.352+07	2021-03-19 23:48:48.352+07	\N	2	\N	\N
1001	BROWSER	2021-03-19 23:48:54.677+07	2021-03-19 23:48:54.677+07	\N	2	\N	\N
1002	BROWSER	2021-03-19 23:50:10.621+07	2021-03-19 23:50:10.621+07	\N	2	\N	\N
1003	BROWSER	2021-03-19 23:52:51.554+07	2021-03-19 23:52:51.554+07	\N	2	\N	\N
1004	BROWSER	2021-03-19 23:53:24.286+07	2021-03-19 23:53:24.286+07	\N	2	\N	\N
1005	BROWSER	2021-03-19 23:55:13.504+07	2021-03-19 23:55:13.504+07	\N	2	\N	\N
1006	BROWSER	2021-03-19 23:56:43.188+07	2021-03-19 23:56:43.188+07	\N	2	\N	\N
1007	BROWSER	2021-03-19 23:57:00.423+07	2021-03-19 23:57:00.423+07	\N	2	\N	\N
1008	BROWSER	2021-03-19 23:57:25.349+07	2021-03-19 23:57:25.349+07	\N	2	\N	\N
1009	BROWSER	2021-03-19 23:57:36.778+07	2021-03-19 23:57:36.778+07	\N	2	\N	\N
1010	BROWSER	2021-03-20 00:05:47.743+07	2021-03-20 00:05:47.743+07	\N	2	\N	\N
1011	BROWSER	2021-03-20 00:06:29.872+07	2021-03-20 00:06:29.872+07	\N	2	\N	\N
1012	BROWSER	2021-03-20 00:08:38.161+07	2021-03-20 00:08:38.161+07	\N	2	\N	\N
1013	BROWSER	2021-03-20 00:09:10.91+07	2021-03-20 00:09:10.91+07	\N	2	\N	\N
1014	BROWSER	2021-03-20 00:10:35.14+07	2021-03-20 00:10:35.14+07	\N	2	\N	\N
1015	BROWSER	2021-03-20 00:11:39.637+07	2021-03-20 00:11:39.637+07	\N	2	\N	\N
1016	BROWSER	2021-03-20 00:16:31.077+07	2021-03-20 00:16:31.077+07	\N	2	\N	\N
1017	BROWSER	2021-03-20 00:24:48.556+07	2021-03-20 00:24:48.556+07	\N	2	\N	\N
1018	BROWSER	2021-03-20 00:25:21.511+07	2021-03-20 00:25:21.511+07	\N	2	\N	\N
1019	BROWSER	2021-03-20 00:25:41.749+07	2021-03-20 00:25:41.749+07	\N	2	\N	\N
1020	BROWSER	2021-03-20 00:26:22.711+07	2021-03-20 00:26:22.711+07	\N	2	\N	\N
1021	BROWSER	2021-03-20 00:26:34.752+07	2021-03-20 00:26:34.752+07	\N	2	\N	\N
1022	BROWSER	2021-03-20 00:27:16.343+07	2021-03-20 00:27:16.343+07	\N	2	\N	\N
1023	BROWSER	2021-03-20 00:27:32.038+07	2021-03-20 00:27:32.038+07	\N	2	\N	\N
1024	BROWSER	2021-03-23 21:07:58.544+07	2021-03-23 21:07:58.544+07	\N	2	\N	\N
1025	BROWSER	2021-03-23 21:15:15.173+07	2021-03-23 21:15:15.173+07	\N	2	\N	\N
1026	BROWSER	2021-03-23 21:15:54.024+07	2021-03-23 21:15:54.024+07	\N	2	\N	\N
1027	BROWSER	2021-03-23 21:16:07.833+07	2021-03-23 21:16:07.833+07	\N	2	\N	\N
1028	BROWSER	2021-03-23 21:16:16.747+07	2021-03-23 21:16:16.747+07	\N	2	\N	\N
1029	BROWSER	2021-03-23 21:16:52.931+07	2021-03-23 21:16:52.931+07	\N	2	\N	\N
1030	BROWSER	2021-03-23 21:17:28.513+07	2021-03-23 21:17:28.513+07	\N	2	\N	\N
1031	BROWSER	2021-03-23 21:17:45.924+07	2021-03-23 21:17:45.924+07	\N	2	\N	\N
1032	BROWSER	2021-03-23 21:17:57.66+07	2021-03-23 21:17:57.66+07	\N	2	\N	\N
1033	BROWSER	2021-03-23 21:19:18.195+07	2021-03-23 21:19:18.195+07	\N	2	\N	\N
1034	BROWSER	2021-03-23 21:19:45.577+07	2021-03-23 21:19:45.577+07	\N	2	\N	\N
1035	BROWSER	2021-03-23 21:20:13.107+07	2021-03-23 21:20:13.107+07	\N	2	\N	\N
1036	BROWSER	2021-03-23 21:20:19.206+07	2021-03-23 21:20:19.206+07	\N	2	\N	\N
1037	BROWSER	2021-03-23 21:20:54.389+07	2021-03-23 21:20:54.389+07	\N	2	\N	\N
1038	BROWSER	2021-03-23 21:23:38.401+07	2021-03-23 21:23:38.401+07	\N	2	\N	\N
1039	BROWSER	2021-03-23 21:25:15.714+07	2021-03-23 21:25:15.714+07	\N	2	\N	\N
1040	BROWSER	2021-03-23 21:27:02.669+07	2021-03-23 21:27:02.669+07	\N	2	\N	\N
1041	BROWSER	2021-03-23 21:31:25.149+07	2021-03-23 21:31:25.149+07	\N	2	\N	\N
1042	BROWSER	2021-03-23 21:31:46.465+07	2021-03-23 21:31:46.465+07	\N	2	\N	\N
1043	BROWSER	2021-03-23 21:32:14.793+07	2021-03-23 21:32:14.793+07	\N	2	\N	\N
1044	BROWSER	2021-03-23 21:33:20.643+07	2021-03-23 21:33:20.643+07	\N	2	\N	\N
1045	BROWSER	2021-03-23 21:33:55.613+07	2021-03-23 21:33:55.613+07	\N	2	\N	\N
1046	BROWSER	2021-03-23 21:34:43.336+07	2021-03-23 21:34:43.336+07	\N	2	\N	\N
1047	BROWSER	2021-03-23 21:35:11.424+07	2021-03-23 21:35:11.424+07	\N	2	\N	\N
1048	BROWSER	2021-03-23 21:35:21.206+07	2021-03-23 21:35:21.206+07	\N	2	\N	\N
1049	BROWSER	2021-03-23 21:37:22.007+07	2021-03-23 21:37:22.007+07	\N	2	\N	\N
1050	BROWSER	2021-03-23 21:37:27.082+07	2021-03-23 21:37:27.082+07	\N	2	\N	\N
1051	BROWSER	2021-03-23 21:39:51.198+07	2021-03-23 21:39:51.198+07	\N	2	\N	\N
1052	BROWSER	2021-03-23 21:40:59.586+07	2021-03-23 21:40:59.586+07	\N	2	\N	\N
1053	MOBILE	2021-03-23 21:43:10.217+07	2021-03-23 21:43:10.217+07	\N	2	\N	\N
1054	BROWSER	2021-03-23 21:44:41.837+07	2021-03-23 21:44:41.837+07	\N	2	\N	\N
1055	BROWSER	2021-03-23 21:46:36.012+07	2021-03-23 21:46:36.012+07	\N	2	\N	\N
1056	BROWSER	2021-03-23 21:46:54.25+07	2021-03-23 21:46:54.25+07	\N	2	\N	\N
1057	BROWSER	2021-03-23 21:49:55.547+07	2021-03-23 21:49:55.547+07	\N	2	\N	\N
1058	BROWSER	2021-03-23 21:53:57.249+07	2021-03-23 21:53:57.249+07	\N	2	\N	\N
1059	BROWSER	2021-03-23 21:56:43.033+07	2021-03-23 21:56:43.033+07	\N	2	\N	\N
1060	BROWSER	2021-03-23 21:58:27.326+07	2021-03-23 21:58:27.326+07	\N	2	\N	\N
1061	BROWSER	2021-03-23 21:59:48.973+07	2021-03-23 21:59:48.973+07	\N	2	\N	\N
1062	BROWSER	2021-03-23 22:00:32.468+07	2021-03-23 22:00:32.468+07	\N	2	\N	\N
1063	BROWSER	2021-03-23 22:00:35.418+07	2021-03-23 22:00:35.418+07	\N	2	\N	\N
1064	BROWSER	2021-03-23 22:01:26.691+07	2021-03-23 22:01:26.691+07	\N	2	\N	\N
1065	BROWSER	2021-03-23 22:01:34.522+07	2021-03-23 22:01:34.522+07	\N	2	\N	\N
1066	BROWSER	2021-03-23 22:01:41.86+07	2021-03-23 22:01:41.86+07	\N	2	\N	\N
1067	BROWSER	2021-03-23 22:07:34.36+07	2021-03-23 22:07:34.36+07	\N	2	\N	\N
1068	BROWSER	2021-03-23 22:08:00.536+07	2021-03-23 22:08:00.536+07	\N	2	\N	\N
1069	BROWSER	2021-03-23 22:08:47.721+07	2021-03-23 22:08:47.721+07	\N	2	\N	\N
1070	BROWSER	2021-03-23 22:08:54.499+07	2021-03-23 22:08:54.499+07	\N	2	\N	\N
1071	BROWSER	2021-03-23 22:09:39.992+07	2021-03-23 22:09:39.992+07	\N	2	\N	\N
1072	BROWSER	2021-03-23 22:21:29.961+07	2021-03-23 22:21:29.961+07	\N	2	\N	\N
1073	BROWSER	2021-03-24 21:36:06.405+07	2021-03-24 21:36:06.405+07	\N	2	\N	\N
1074	BROWSER	2021-03-24 21:37:23.924+07	2021-03-24 21:37:23.924+07	\N	2	\N	\N
1075	BROWSER	2021-03-24 21:43:49.969+07	2021-03-24 21:43:49.969+07	\N	2	\N	\N
1076	BROWSER	2021-03-24 21:45:07.22+07	2021-03-24 21:45:07.22+07	\N	2	\N	\N
1077	BROWSER	2021-03-24 21:50:59.081+07	2021-03-24 21:50:59.081+07	\N	2	\N	\N
1078	BROWSER	2021-03-24 21:52:38.731+07	2021-03-24 21:52:38.731+07	\N	2	\N	\N
1079	BROWSER	2021-03-24 21:54:45.535+07	2021-03-24 21:54:45.535+07	\N	2	\N	\N
1080	BROWSER	2021-03-24 21:56:07.572+07	2021-03-24 21:56:07.572+07	\N	2	\N	\N
1081	BROWSER	2021-03-24 21:57:37.161+07	2021-03-24 21:57:37.161+07	\N	2	\N	\N
1082	BROWSER	2021-03-24 21:58:01.54+07	2021-03-24 21:58:01.54+07	\N	2	\N	\N
1083	BROWSER	2021-03-24 22:01:12.834+07	2021-03-24 22:01:12.834+07	\N	2	\N	\N
1084	BROWSER	2021-03-24 22:03:33.621+07	2021-03-24 22:03:33.621+07	\N	2	\N	\N
1085	BROWSER	2021-03-24 22:05:27.25+07	2021-03-24 22:05:27.25+07	\N	2	\N	\N
1086	BROWSER	2021-03-24 22:05:37.748+07	2021-03-24 22:05:37.748+07	\N	2	\N	\N
1087	BROWSER	2021-03-24 22:07:05.289+07	2021-03-24 22:07:05.289+07	\N	2	\N	\N
1088	BROWSER	2021-03-24 22:09:19.933+07	2021-03-24 22:09:19.933+07	\N	2	\N	\N
1089	BROWSER	2021-03-24 22:09:52.144+07	2021-03-24 22:09:52.144+07	\N	2	\N	\N
1090	BROWSER	2021-03-24 22:15:31.896+07	2021-03-24 22:15:31.896+07	\N	2	\N	\N
1091	BROWSER	2021-03-24 22:15:37.143+07	2021-03-24 22:15:37.143+07	\N	2	\N	\N
1092	BROWSER	2021-03-24 22:17:09.251+07	2021-03-24 22:17:09.251+07	\N	2	\N	\N
1093	BROWSER	2021-03-24 22:17:39.524+07	2021-03-24 22:17:39.524+07	\N	2	\N	\N
1094	BROWSER	2021-03-24 22:19:53.458+07	2021-03-24 22:19:53.458+07	\N	2	\N	\N
1095	BROWSER	2021-03-24 22:20:31.993+07	2021-03-24 22:20:31.993+07	\N	2	\N	\N
1096	BROWSER	2021-03-24 22:20:33.226+07	2021-03-24 22:20:33.226+07	\N	2	\N	\N
1097	BROWSER	2021-03-24 22:21:28.288+07	2021-03-24 22:21:28.288+07	\N	2	\N	\N
1098	BROWSER	2021-03-24 22:23:48.713+07	2021-03-24 22:23:48.713+07	\N	2	\N	\N
1099	BROWSER	2021-03-24 22:24:25.933+07	2021-03-24 22:24:25.933+07	\N	2	\N	\N
1100	BROWSER	2021-03-24 22:26:39.208+07	2021-03-24 22:26:39.208+07	\N	2	\N	\N
1101	BROWSER	2021-03-24 22:26:40.861+07	2021-03-24 22:26:40.861+07	\N	2	\N	\N
1102	BROWSER	2021-03-24 22:34:29.843+07	2021-03-24 22:34:29.843+07	\N	2	\N	\N
1103	BROWSER	2021-03-24 22:34:32.373+07	2021-03-24 22:34:32.373+07	\N	2	\N	\N
1104	BROWSER	2021-03-24 22:35:26.468+07	2021-03-24 22:35:26.468+07	\N	2	\N	\N
1105	BROWSER	2021-03-24 22:35:34.44+07	2021-03-24 22:35:34.44+07	\N	2	\N	\N
1106	BROWSER	2021-03-24 22:35:53.385+07	2021-03-24 22:35:53.385+07	\N	2	\N	\N
1107	BROWSER	2021-03-24 22:36:08.076+07	2021-03-24 22:36:08.076+07	\N	2	\N	\N
1108	BROWSER	2021-03-24 22:36:32.117+07	2021-03-24 22:36:32.117+07	\N	2	\N	\N
1109	BROWSER	2021-03-24 22:36:47.65+07	2021-03-24 22:36:47.65+07	\N	2	\N	\N
1110	BROWSER	2021-03-24 22:38:47.387+07	2021-03-24 22:38:47.387+07	\N	2	\N	\N
1111	BROWSER	2021-03-24 22:39:09.28+07	2021-03-24 22:39:09.28+07	\N	2	\N	\N
1112	BROWSER	2021-03-24 22:40:17.876+07	2021-03-24 22:40:17.876+07	\N	2	\N	\N
1113	BROWSER	2021-03-24 22:40:31.909+07	2021-03-24 22:40:31.909+07	\N	2	\N	\N
1114	BROWSER	2021-03-24 22:43:02.15+07	2021-03-24 22:43:02.15+07	\N	2	\N	\N
1115	BROWSER	2021-03-24 22:43:10.207+07	2021-03-24 22:43:10.207+07	\N	2	\N	\N
1116	BROWSER	2021-03-24 22:43:30.926+07	2021-03-24 22:43:30.926+07	\N	2	\N	\N
1117	BROWSER	2021-03-24 22:44:14.81+07	2021-03-24 22:44:14.81+07	\N	2	\N	\N
1118	BROWSER	2021-03-24 22:44:28.294+07	2021-03-24 22:44:28.294+07	\N	2	\N	\N
1119	BROWSER	2021-03-24 22:45:07.809+07	2021-03-24 22:45:07.809+07	\N	2	\N	\N
1120	BROWSER	2021-03-24 22:45:08.923+07	2021-03-24 22:45:08.923+07	\N	2	\N	\N
1121	BROWSER	2021-03-24 22:46:04.595+07	2021-03-24 22:46:04.595+07	\N	2	\N	\N
1122	BROWSER	2021-03-24 22:46:17.349+07	2021-03-24 22:46:17.349+07	\N	2	\N	\N
1123	BROWSER	2021-03-24 22:46:38.857+07	2021-03-24 22:46:38.857+07	\N	2	\N	\N
1124	BROWSER	2021-03-24 22:46:47.886+07	2021-03-24 22:46:47.886+07	\N	2	\N	\N
1125	BROWSER	2021-03-24 22:47:03.134+07	2021-03-24 22:47:03.134+07	\N	2	\N	\N
1126	BROWSER	2021-03-24 22:47:19.615+07	2021-03-24 22:47:19.615+07	\N	2	\N	\N
1127	BROWSER	2021-03-24 22:48:34.375+07	2021-03-24 22:48:34.375+07	\N	2	\N	\N
1128	BROWSER	2021-03-24 22:49:29.684+07	2021-03-24 22:49:29.684+07	\N	2	\N	\N
1129	BROWSER	2021-03-24 22:49:40.386+07	2021-03-24 22:49:40.386+07	\N	2	\N	\N
1130	BROWSER	2021-03-24 22:50:59.131+07	2021-03-24 22:50:59.131+07	\N	2	\N	\N
1131	BROWSER	2021-03-24 22:52:29.824+07	2021-03-24 22:52:29.824+07	\N	2	\N	\N
1132	BROWSER	2021-03-24 22:54:01.137+07	2021-03-24 22:54:01.137+07	\N	2	\N	\N
1133	BROWSER	2021-03-24 22:56:42.618+07	2021-03-24 22:56:42.618+07	\N	2	\N	\N
1134	BROWSER	2021-03-24 22:56:51.095+07	2021-03-24 22:56:51.095+07	\N	2	\N	\N
1135	BROWSER	2021-03-24 22:57:03.863+07	2021-03-24 22:57:03.863+07	\N	2	\N	\N
1136	BROWSER	2021-03-24 22:57:43.678+07	2021-03-24 22:57:43.678+07	\N	2	\N	\N
1137	BROWSER	2021-03-24 22:58:37.035+07	2021-03-24 22:58:37.035+07	\N	2	\N	\N
1138	BROWSER	2021-03-24 22:58:46.219+07	2021-03-24 22:58:46.219+07	\N	2	\N	\N
1139	BROWSER	2021-03-24 22:58:56.455+07	2021-03-24 22:58:56.455+07	\N	2	\N	\N
1140	BROWSER	2021-03-24 22:59:02.535+07	2021-03-24 22:59:02.535+07	\N	2	\N	\N
1141	BROWSER	2021-03-24 22:59:21.324+07	2021-03-24 22:59:21.324+07	\N	2	\N	\N
1142	BROWSER	2021-03-24 23:01:06.701+07	2021-03-24 23:01:06.701+07	\N	2	\N	\N
1143	BROWSER	2021-03-24 23:02:02.267+07	2021-03-24 23:02:02.267+07	\N	2	\N	\N
1144	BROWSER	2021-03-24 23:02:19.099+07	2021-03-24 23:02:19.099+07	\N	2	\N	\N
1145	BROWSER	2021-03-24 23:02:20.305+07	2021-03-24 23:02:20.305+07	\N	2	\N	\N
1146	BROWSER	2021-03-24 23:02:53.717+07	2021-03-24 23:02:53.717+07	\N	2	\N	\N
1147	BROWSER	2021-03-24 23:02:54.463+07	2021-03-24 23:02:54.463+07	\N	2	\N	\N
1148	BROWSER	2021-03-24 23:04:14.217+07	2021-03-24 23:04:14.217+07	\N	2	\N	\N
1149	BROWSER	2021-03-24 23:04:15.288+07	2021-03-24 23:04:15.288+07	\N	2	\N	\N
1150	BROWSER	2021-03-24 23:05:06.317+07	2021-03-24 23:05:06.317+07	\N	2	\N	\N
1151	BROWSER	2021-03-24 23:05:08.258+07	2021-03-24 23:05:08.258+07	\N	2	\N	\N
1152	BROWSER	2021-03-24 23:05:32.823+07	2021-03-24 23:05:32.823+07	\N	2	\N	\N
1153	BROWSER	2021-03-24 23:05:33.585+07	2021-03-24 23:05:33.585+07	\N	2	\N	\N
1154	BROWSER	2021-03-24 23:08:35.013+07	2021-03-24 23:08:35.013+07	\N	2	\N	\N
1155	BROWSER	2021-03-24 23:08:34.931+07	2021-03-24 23:08:34.931+07	\N	2	\N	\N
1156	BROWSER	2021-03-24 23:08:51.679+07	2021-03-24 23:08:51.679+07	\N	2	\N	\N
1157	BROWSER	2021-03-24 23:09:09.926+07	2021-03-24 23:09:09.926+07	\N	2	\N	\N
1158	BROWSER	2021-03-24 23:10:03.491+07	2021-03-24 23:10:03.491+07	\N	2	\N	\N
1159	BROWSER	2021-03-24 23:14:27.131+07	2021-03-24 23:14:27.131+07	\N	2	\N	\N
1160	BROWSER	2021-03-24 23:30:53.979+07	2021-03-24 23:30:53.979+07	\N	2	\N	\N
1161	BROWSER	2021-03-24 23:38:14.85+07	2021-03-24 23:38:14.85+07	\N	2	\N	\N
1162	BROWSER	2021-03-24 23:38:32.295+07	2021-03-24 23:38:32.295+07	\N	2	\N	\N
1163	BROWSER	2021-03-24 23:43:26.852+07	2021-03-24 23:43:26.852+07	\N	2	\N	\N
1164	BROWSER	2021-03-25 14:21:29.535+07	2021-03-25 14:21:29.535+07	\N	2	\N	\N
1165	BROWSER	2021-03-25 14:22:42.669+07	2021-03-25 14:22:42.669+07	\N	2	\N	\N
1166	BROWSER	2021-03-25 14:23:49.697+07	2021-03-25 14:23:49.697+07	\N	2	\N	\N
1167	BROWSER	2021-03-25 14:25:55.699+07	2021-03-25 14:25:55.699+07	\N	2	\N	\N
1168	BROWSER	2021-03-25 14:30:13.617+07	2021-03-25 14:30:13.617+07	\N	2	\N	\N
1169	BROWSER	2021-03-25 14:33:32.649+07	2021-03-25 14:33:32.649+07	\N	2	\N	\N
1170	BROWSER	2021-03-25 14:36:54.982+07	2021-03-25 14:36:54.982+07	\N	2	\N	\N
1171	BROWSER	2021-03-25 14:41:01.315+07	2021-03-25 14:41:01.315+07	\N	2	\N	\N
1172	BROWSER	2021-03-25 14:42:57.838+07	2021-03-25 14:42:57.838+07	\N	2	\N	\N
1173	BROWSER	2021-03-25 15:20:08.299+07	2021-03-25 15:20:08.299+07	\N	2	\N	\N
1174	BROWSER	2021-03-25 15:20:43.261+07	2021-03-25 15:20:43.261+07	\N	2	\N	\N
1175	BROWSER	2021-03-25 15:20:46.935+07	2021-03-25 15:20:46.935+07	\N	2	\N	\N
1176	BROWSER	2021-03-25 15:22:12.223+07	2021-03-25 15:22:12.223+07	\N	2	\N	\N
1177	BROWSER	2021-03-25 15:22:28.158+07	2021-03-25 15:22:28.158+07	\N	2	\N	\N
1178	BROWSER	2021-03-25 15:23:05.782+07	2021-03-25 15:23:05.782+07	\N	2	\N	\N
1179	BROWSER	2021-03-25 15:24:14.384+07	2021-03-25 15:24:14.384+07	\N	2	\N	\N
1180	BROWSER	2021-03-25 15:24:31.903+07	2021-03-25 15:24:31.903+07	\N	2	\N	\N
1181	BROWSER	2021-03-25 15:25:55.408+07	2021-03-25 15:25:55.408+07	\N	2	\N	\N
1182	BROWSER	2021-03-25 15:26:05.972+07	2021-03-25 15:26:05.972+07	\N	2	\N	\N
1183	BROWSER	2021-03-25 15:26:15.949+07	2021-03-25 15:26:15.949+07	\N	2	\N	\N
1184	BROWSER	2021-03-25 15:26:28.219+07	2021-03-25 15:26:28.219+07	\N	2	\N	\N
1185	BROWSER	2021-03-25 15:26:38.303+07	2021-03-25 15:26:38.303+07	\N	2	\N	\N
1186	BROWSER	2021-03-25 15:27:11.306+07	2021-03-25 15:27:11.306+07	\N	1	\N	\N
1187	BROWSER	2021-03-25 15:28:48.584+07	2021-03-25 15:28:48.584+07	\N	1	\N	\N
1188	BROWSER	2021-03-25 15:28:59.382+07	2021-03-25 15:28:59.382+07	\N	1	\N	\N
1189	BROWSER	2021-03-25 15:29:05.168+07	2021-03-25 15:29:05.168+07	\N	1	\N	\N
1190	BROWSER	2021-03-25 15:29:07.66+07	2021-03-25 15:29:07.66+07	\N	2	\N	\N
1191	BROWSER	2021-03-25 15:29:33.989+07	2021-03-25 15:29:33.989+07	\N	2	\N	\N
1192	BROWSER	2021-03-25 15:32:27.508+07	2021-03-25 15:32:27.508+07	\N	2	\N	\N
1193	BROWSER	2021-03-25 15:34:55.614+07	2021-03-25 15:34:55.614+07	\N	2	\N	\N
1194	BROWSER	2021-03-25 15:36:19.082+07	2021-03-25 15:36:19.082+07	\N	2	\N	\N
1195	BROWSER	2021-03-25 15:37:14.417+07	2021-03-25 15:37:14.417+07	\N	2	\N	\N
1196	BROWSER	2021-03-25 15:37:29.335+07	2021-03-25 15:37:29.335+07	\N	2	\N	\N
1197	BROWSER	2021-03-25 15:38:29.617+07	2021-03-25 15:38:29.617+07	\N	1	\N	\N
1198	BROWSER	2021-03-25 15:38:30.412+07	2021-03-25 15:38:30.412+07	\N	2	\N	\N
1199	BROWSER	2021-03-25 15:38:49.76+07	2021-03-25 15:38:49.76+07	\N	1	\N	\N
1200	BROWSER	2021-03-25 15:38:51.943+07	2021-03-25 15:38:51.943+07	\N	2	\N	\N
1201	BROWSER	2021-03-25 15:41:45.166+07	2021-03-25 15:41:45.166+07	\N	1	\N	\N
1202	BROWSER	2021-03-25 15:41:46.832+07	2021-03-25 15:41:46.832+07	\N	2	\N	\N
1203	BROWSER	2021-03-25 15:42:37.744+07	2021-03-25 15:42:37.744+07	\N	1	\N	\N
1204	BROWSER	2021-03-25 15:42:38.97+07	2021-03-25 15:42:38.97+07	\N	2	\N	\N
1205	BROWSER	2021-03-25 15:43:44.08+07	2021-03-25 15:43:44.08+07	\N	1	\N	\N
1206	BROWSER	2021-03-25 15:43:46.167+07	2021-03-25 15:43:46.167+07	\N	2	\N	\N
1207	BROWSER	2021-03-25 15:45:26.611+07	2021-03-25 15:45:26.611+07	\N	1	\N	\N
1208	BROWSER	2021-03-25 15:45:28.137+07	2021-03-25 15:45:28.137+07	\N	2	\N	\N
1209	BROWSER	2021-03-25 15:46:03.766+07	2021-03-25 15:46:03.766+07	\N	1	\N	\N
1210	BROWSER	2021-03-25 15:46:06.095+07	2021-03-25 15:46:06.095+07	\N	2	\N	\N
1211	BROWSER	2021-03-25 15:46:16.533+07	2021-03-25 15:46:16.533+07	\N	1	\N	\N
1212	BROWSER	2021-03-25 15:46:19.582+07	2021-03-25 15:46:19.582+07	\N	2	\N	\N
1213	BROWSER	2021-03-25 15:46:52.195+07	2021-03-25 15:46:52.195+07	\N	1	\N	\N
1214	BROWSER	2021-03-25 15:46:54.12+07	2021-03-25 15:46:54.12+07	\N	2	\N	\N
1215	BROWSER	2021-03-25 15:47:17.617+07	2021-03-25 15:47:17.617+07	\N	1	\N	\N
1216	BROWSER	2021-03-25 15:47:19.158+07	2021-03-25 15:47:19.158+07	\N	2	\N	\N
1217	BROWSER	2021-03-25 15:48:51.2+07	2021-03-25 15:48:51.2+07	\N	2	\N	\N
1218	BROWSER	2021-03-25 15:50:01.922+07	2021-03-25 15:50:01.922+07	\N	2	\N	\N
1219	BROWSER	2021-03-25 15:51:07.736+07	2021-03-25 15:51:07.736+07	\N	2	\N	\N
1220	BROWSER	2021-03-25 15:51:16.549+07	2021-03-25 15:51:16.549+07	\N	2	\N	\N
1221	BROWSER	2021-03-25 15:53:05.445+07	2021-03-25 15:53:05.445+07	\N	2	\N	\N
1222	BROWSER	2021-03-25 15:53:59.607+07	2021-03-25 15:53:59.607+07	\N	2	\N	\N
1223	BROWSER	2021-03-25 15:57:28.369+07	2021-03-25 15:57:28.369+07	\N	2	\N	\N
1224	BROWSER	2021-03-25 15:58:06.81+07	2021-03-25 15:58:06.81+07	\N	2	\N	\N
1225	BROWSER	2021-03-25 15:58:46.146+07	2021-03-25 15:58:46.146+07	\N	2	\N	\N
1226	BROWSER	2021-03-25 15:59:27.467+07	2021-03-25 15:59:27.467+07	\N	2	\N	\N
1227	BROWSER	2021-03-25 16:01:23.047+07	2021-03-25 16:01:23.047+07	\N	2	\N	\N
1228	BROWSER	2021-03-25 16:01:47.512+07	2021-03-25 16:01:47.512+07	\N	2	\N	\N
1229	BROWSER	2021-03-25 16:03:12.972+07	2021-03-25 16:03:12.972+07	\N	2	\N	\N
1230	BROWSER	2021-03-25 16:03:20.848+07	2021-03-25 16:03:20.848+07	\N	2	\N	\N
1231	BROWSER	2021-03-25 16:04:27.131+07	2021-03-25 16:04:27.131+07	\N	2	\N	\N
1232	BROWSER	2021-03-25 16:04:41.961+07	2021-03-25 16:04:41.961+07	\N	2	\N	\N
1233	BROWSER	2021-03-25 16:04:50.207+07	2021-03-25 16:04:50.207+07	\N	2	\N	\N
1234	BROWSER	2021-03-25 16:05:17.301+07	2021-03-25 16:05:17.301+07	\N	2	\N	\N
1235	BROWSER	2021-03-25 16:05:38.208+07	2021-03-25 16:05:38.208+07	\N	2	\N	\N
1236	BROWSER	2021-03-25 16:07:59.456+07	2021-03-25 16:07:59.456+07	\N	2	\N	\N
1237	BROWSER	2021-03-25 16:08:55.137+07	2021-03-25 16:08:55.137+07	\N	2	\N	\N
1238	BROWSER	2021-03-25 16:09:48.523+07	2021-03-25 16:09:48.523+07	\N	2	\N	\N
1239	BROWSER	2021-03-25 16:09:59.118+07	2021-03-25 16:09:59.118+07	\N	2	\N	\N
1240	BROWSER	2021-03-25 16:10:21.809+07	2021-03-25 16:10:21.809+07	\N	2	\N	\N
1241	BROWSER	2021-03-25 16:10:43.59+07	2021-03-25 16:10:43.59+07	\N	2	\N	\N
1242	BROWSER	2021-03-25 16:10:51.954+07	2021-03-25 16:10:51.954+07	\N	2	\N	\N
1243	BROWSER	2021-03-25 16:11:21.597+07	2021-03-25 16:11:21.597+07	\N	2	\N	\N
1244	BROWSER	2021-03-25 16:12:02.484+07	2021-03-25 16:12:02.484+07	\N	2	\N	\N
1245	BROWSER	2021-03-25 16:12:02.818+07	2021-03-25 16:12:02.818+07	\N	1	\N	\N
1246	BROWSER	2021-03-25 16:12:37.421+07	2021-03-25 16:12:37.421+07	\N	2	\N	\N
1247	BROWSER	2021-03-25 16:12:50.083+07	2021-03-25 16:12:50.083+07	\N	2	\N	\N
1248	BROWSER	2021-03-25 16:13:30.954+07	2021-03-25 16:13:30.954+07	\N	2	\N	\N
1249	BROWSER	2021-03-25 16:16:20.756+07	2021-03-25 16:16:20.756+07	\N	2	\N	\N
1250	BROWSER	2021-03-25 16:17:16.828+07	2021-03-25 16:17:16.828+07	\N	2	\N	\N
1251	BROWSER	2021-03-25 16:18:14.498+07	2021-03-25 16:18:14.498+07	\N	2	\N	\N
1252	BROWSER	2021-03-25 16:18:44.213+07	2021-03-25 16:18:44.213+07	\N	2	\N	\N
1253	BROWSER	2021-03-25 16:19:35.088+07	2021-03-25 16:19:35.088+07	\N	2	\N	\N
1254	BROWSER	2021-03-25 16:21:47.999+07	2021-03-25 16:21:47.999+07	\N	2	\N	\N
1255	BROWSER	2021-03-25 16:22:40.466+07	2021-03-25 16:22:40.466+07	\N	2	\N	\N
1256	BROWSER	2021-03-25 16:23:05.486+07	2021-03-25 16:23:05.486+07	\N	2	\N	\N
1257	BROWSER	2021-03-25 16:24:37.801+07	2021-03-25 16:24:37.801+07	\N	2	\N	\N
1258	BROWSER	2021-03-25 16:28:47.916+07	2021-03-25 16:28:47.916+07	\N	2	\N	\N
1259	BROWSER	2021-03-25 16:28:49.698+07	2021-03-25 16:28:49.698+07	\N	1	\N	\N
1260	BROWSER	2021-03-25 16:29:17.525+07	2021-03-25 16:29:17.525+07	\N	1	\N	\N
1261	BROWSER	2021-03-25 16:29:18.031+07	2021-03-25 16:29:18.031+07	\N	2	\N	\N
1262	BROWSER	2021-03-25 16:32:41.717+07	2021-03-25 16:32:41.717+07	\N	2	\N	\N
1263	BROWSER	2021-03-25 16:32:47.221+07	2021-03-25 16:32:47.221+07	\N	2	\N	\N
1264	BROWSER	2021-03-25 16:34:05.285+07	2021-03-25 16:34:05.285+07	\N	2	\N	\N
1265	BROWSER	2021-03-25 16:35:06.014+07	2021-03-25 16:35:06.014+07	\N	2	\N	\N
1266	BROWSER	2021-03-25 16:35:31.316+07	2021-03-25 16:35:31.316+07	\N	2	\N	\N
1267	BROWSER	2021-03-25 16:37:21.793+07	2021-03-25 16:37:21.793+07	\N	2	\N	\N
1268	BROWSER	2021-03-25 16:37:29.126+07	2021-03-25 16:37:29.126+07	\N	2	\N	\N
1269	BROWSER	2021-03-25 16:39:02.214+07	2021-03-25 16:39:02.214+07	\N	2	\N	\N
1270	BROWSER	2021-03-25 16:39:43.938+07	2021-03-25 16:39:43.938+07	\N	2	\N	\N
1271	BROWSER	2021-03-25 16:40:18.002+07	2021-03-25 16:40:18.002+07	\N	2	\N	\N
1272	BROWSER	2021-03-25 16:41:14.192+07	2021-03-25 16:41:14.192+07	\N	2	\N	\N
1273	BROWSER	2021-03-25 16:43:56.159+07	2021-03-25 16:43:56.159+07	\N	2	\N	\N
1274	BROWSER	2021-03-25 16:44:28.78+07	2021-03-25 16:44:28.78+07	\N	2	\N	\N
1275	BROWSER	2021-03-25 16:44:42.044+07	2021-03-25 16:44:42.044+07	\N	2	\N	\N
1276	BROWSER	2021-03-25 16:44:49.747+07	2021-03-25 16:44:49.747+07	\N	2	\N	\N
1277	BROWSER	2021-03-25 16:45:04.652+07	2021-03-25 16:45:04.652+07	\N	2	\N	\N
1278	BROWSER	2021-03-25 16:45:15.824+07	2021-03-25 16:45:15.824+07	\N	2	\N	\N
1279	BROWSER	2021-03-25 16:45:29.339+07	2021-03-25 16:45:29.339+07	\N	2	\N	\N
1280	BROWSER	2021-03-25 16:55:14.782+07	2021-03-25 16:55:14.782+07	\N	1	\N	\N
1281	BROWSER	2021-03-25 16:55:16.296+07	2021-03-25 16:55:16.296+07	\N	2	\N	\N
1282	BROWSER	2021-03-25 16:55:46.33+07	2021-03-25 16:55:46.33+07	\N	2	\N	\N
1283	BROWSER	2021-03-25 16:56:43.772+07	2021-03-25 16:56:43.772+07	\N	2	\N	\N
1284	BROWSER	2021-03-25 16:57:56.027+07	2021-03-25 16:57:56.027+07	\N	2	\N	\N
1285	BROWSER	2021-03-25 17:05:40.154+07	2021-03-25 17:05:40.154+07	\N	2	\N	\N
1286	BROWSER	2021-03-25 17:07:17.503+07	2021-03-25 17:07:17.503+07	\N	1	\N	\N
1287	BROWSER	2021-03-25 17:07:18.618+07	2021-03-25 17:07:18.618+07	\N	2	\N	\N
1288	BROWSER	2021-03-25 17:07:45.125+07	2021-03-25 17:07:45.125+07	\N	2	\N	\N
1289	BROWSER	2021-03-25 17:10:28.659+07	2021-03-25 17:10:28.659+07	\N	1	\N	\N
1290	BROWSER	2021-03-25 17:10:30.328+07	2021-03-25 17:10:30.328+07	\N	2	\N	\N
1291	BROWSER	2021-03-25 17:10:53.388+07	2021-03-25 17:10:53.388+07	\N	2	\N	\N
1292	BROWSER	2021-03-25 17:11:25.239+07	2021-03-25 17:11:25.239+07	\N	2	\N	\N
1293	BROWSER	2021-03-25 17:13:34.349+07	2021-03-25 17:13:34.349+07	\N	1	\N	\N
1294	BROWSER	2021-03-25 17:13:35.716+07	2021-03-25 17:13:35.716+07	\N	2	\N	\N
1295	BROWSER	2021-03-25 17:13:59.826+07	2021-03-25 17:13:59.826+07	\N	1	\N	\N
1296	BROWSER	2021-03-25 17:14:01.445+07	2021-03-25 17:14:01.445+07	\N	2	\N	\N
1297	BROWSER	2021-03-25 17:14:05.674+07	2021-03-25 17:14:05.674+07	\N	1	\N	\N
1298	BROWSER	2021-03-25 17:14:07.333+07	2021-03-25 17:14:07.333+07	\N	2	\N	\N
1299	BROWSER	2021-03-25 17:16:18.615+07	2021-03-25 17:16:18.615+07	\N	1	\N	\N
1300	BROWSER	2021-03-25 17:16:20.287+07	2021-03-25 17:16:20.287+07	\N	2	\N	\N
1301	BROWSER	2021-03-25 17:16:46.278+07	2021-03-25 17:16:46.278+07	\N	1	\N	\N
1302	BROWSER	2021-03-25 17:16:47.656+07	2021-03-25 17:16:47.656+07	\N	2	\N	\N
1303	BROWSER	2021-03-25 17:17:03.349+07	2021-03-25 17:17:03.349+07	\N	2	\N	\N
1304	BROWSER	2021-03-25 17:17:55.044+07	2021-03-25 17:17:55.044+07	\N	2	\N	\N
1305	BROWSER	2021-03-25 17:18:30.489+07	2021-03-25 17:18:30.489+07	\N	2	\N	\N
1306	BROWSER	2021-03-25 17:19:13.753+07	2021-03-25 17:19:13.753+07	\N	2	\N	\N
1307	BROWSER	2021-03-25 17:45:09.451+07	2021-03-25 17:45:09.451+07	\N	2	\N	\N
1308	BROWSER	2021-03-25 17:45:09.768+07	2021-03-25 17:45:09.768+07	\N	2	7	\N
1309	BROWSER	2021-03-25 17:45:17.227+07	2021-03-25 17:45:17.227+07	\N	2	\N	\N
1310	BROWSER	2021-03-25 17:45:34.904+07	2021-03-25 17:45:34.904+07	\N	2	\N	\N
1311	BROWSER	2021-03-25 17:46:00.154+07	2021-03-25 17:46:00.154+07	\N	2	\N	\N
1312	BROWSER	2021-03-25 17:46:00.269+07	2021-03-25 17:46:00.269+07	\N	2	\N	1
1313	BROWSER	2021-03-25 17:46:07.949+07	2021-03-25 17:46:07.949+07	1	2	\N	\N
1314	BROWSER	2021-03-25 17:46:12.758+07	2021-03-25 17:46:12.758+07	2	2	\N	\N
1315	BROWSER	2021-03-25 17:48:07.981+07	2021-03-25 17:48:07.981+07	\N	25	\N	\N
1316	BROWSER	2021-03-25 17:48:12.345+07	2021-03-25 17:48:12.345+07	\N	25	\N	\N
1317	BROWSER	2021-03-25 17:49:27.735+07	2021-03-25 17:49:27.735+07	\N	25	\N	\N
1318	BROWSER	2021-03-25 17:54:03.362+07	2021-03-25 17:54:03.362+07	\N	25	\N	\N
1319	BROWSER	2021-03-25 17:54:03.488+07	2021-03-25 17:54:03.488+07	\N	25	\N	\N
1320	BROWSER	2021-03-25 17:54:03.796+07	2021-03-25 17:54:03.796+07	2	25	\N	\N
1321	BROWSER	2021-03-25 17:54:04.429+07	2021-03-25 17:54:04.429+07	\N	1	\N	\N
1322	BROWSER	2021-03-25 17:54:15.502+07	2021-03-25 17:54:15.502+07	\N	25	\N	\N
1323	BROWSER	2021-03-25 17:56:19.777+07	2021-03-25 17:56:19.777+07	\N	25	\N	\N
1324	BROWSER	2021-03-25 17:56:44.599+07	2021-03-25 17:56:44.599+07	\N	24	\N	\N
1325	BROWSER	2021-03-25 17:57:05.716+07	2021-03-25 17:57:05.716+07	\N	2	\N	\N
1326	BROWSER	2021-03-25 17:57:47.093+07	2021-03-25 17:57:47.093+07	\N	1	\N	\N
1327	BROWSER	2021-03-25 17:57:47.366+07	2021-03-25 17:57:47.366+07	\N	2	\N	\N
1328	BROWSER	2021-03-25 17:57:47.982+07	2021-03-25 17:57:47.982+07	2	2	\N	\N
1329	BROWSER	2021-03-25 17:57:48.794+07	2021-03-25 17:57:48.794+07	\N	2	\N	\N
1330	BROWSER	2021-03-25 17:58:11.81+07	2021-03-25 17:58:11.81+07	\N	2	\N	\N
1331	BROWSER	2021-03-25 17:58:52.615+07	2021-03-25 17:58:52.615+07	\N	2	\N	\N
1332	BROWSER	2021-03-25 17:59:09.054+07	2021-03-25 17:59:09.054+07	\N	24	\N	\N
1333	BROWSER	2021-03-25 18:00:01.256+07	2021-03-25 18:00:01.256+07	\N	24	\N	\N
1334	BROWSER	2021-03-25 18:00:30.823+07	2021-03-25 18:00:30.823+07	\N	2	7	\N
1335	BROWSER	2021-03-25 18:00:35.018+07	2021-03-25 18:00:35.018+07	19	2	\N	\N
1336	BROWSER	2021-03-25 18:00:39.173+07	2021-03-25 18:00:39.173+07	\N	24	\N	\N
1337	BROWSER	2021-03-25 18:01:08.074+07	2021-03-25 18:01:08.074+07	\N	24	\N	\N
1338	BROWSER	2021-03-25 18:01:22.428+07	2021-03-25 18:01:22.428+07	\N	24	\N	\N
1339	BROWSER	2021-03-25 18:01:49.805+07	2021-03-25 18:01:49.805+07	\N	24	\N	\N
1340	BROWSER	2021-03-25 18:02:01.091+07	2021-03-25 18:02:01.091+07	\N	24	\N	\N
1341	BROWSER	2021-03-25 18:03:14.124+07	2021-03-25 18:03:14.124+07	\N	24	\N	\N
1342	BROWSER	2021-03-25 18:03:14.637+07	2021-03-25 18:03:14.637+07	\N	24	\N	\N
1343	BROWSER	2021-03-25 18:03:14.775+07	2021-03-25 18:03:14.775+07	\N	1	\N	\N
1344	BROWSER	2021-03-25 18:03:29.199+07	2021-03-25 18:03:29.199+07	\N	24	\N	\N
1345	BROWSER	2021-03-25 18:03:29.671+07	2021-03-25 18:03:29.671+07	\N	1	\N	\N
1346	BROWSER	2021-03-25 18:03:30.039+07	2021-03-25 18:03:30.039+07	\N	24	\N	\N
1347	BROWSER	2021-03-25 18:07:54.302+07	2021-03-25 18:07:54.302+07	\N	1	\N	\N
1348	BROWSER	2021-03-25 18:07:54.564+07	2021-03-25 18:07:54.564+07	\N	24	\N	\N
1349	BROWSER	2021-03-25 18:07:57.685+07	2021-03-25 18:07:57.685+07	\N	24	\N	\N
1350	BROWSER	2021-03-25 18:08:11.998+07	2021-03-25 18:08:11.998+07	\N	1	\N	\N
1351	BROWSER	2021-03-25 18:08:12.415+07	2021-03-25 18:08:12.415+07	\N	24	\N	\N
1352	BROWSER	2021-03-25 18:08:14.307+07	2021-03-25 18:08:14.307+07	\N	24	\N	\N
1353	BROWSER	2021-03-25 18:08:19.173+07	2021-03-25 18:08:19.173+07	\N	24	\N	\N
1354	BROWSER	2021-03-25 18:08:24.612+07	2021-03-25 18:08:24.612+07	\N	24	\N	\N
1355	BROWSER	2021-03-25 18:10:33.744+07	2021-03-25 18:10:33.744+07	\N	24	\N	\N
1356	BROWSER	2021-03-25 18:10:34.428+07	2021-03-25 18:10:34.428+07	\N	24	\N	\N
1357	BROWSER	2021-03-25 18:11:52.735+07	2021-03-25 18:11:52.735+07	\N	24	\N	\N
1358	BROWSER	2021-03-25 18:11:53.345+07	2021-03-25 18:11:53.345+07	\N	24	\N	\N
1359	BROWSER	2021-03-25 18:12:11.839+07	2021-03-25 18:12:11.839+07	\N	24	\N	\N
1360	BROWSER	2021-03-25 18:12:12.813+07	2021-03-25 18:12:12.813+07	\N	24	\N	\N
1361	BROWSER	2021-03-25 18:12:17.541+07	2021-03-25 18:12:17.541+07	\N	24	\N	\N
1362	BROWSER	2021-03-25 18:12:18.593+07	2021-03-25 18:12:18.593+07	\N	24	\N	\N
1363	BROWSER	2021-03-25 18:12:49.024+07	2021-03-25 18:12:49.024+07	\N	24	\N	\N
1364	MOBILE	2021-03-25 18:12:50.438+07	2021-03-25 18:12:50.438+07	\N	24	\N	\N
1365	BROWSER	2021-03-25 18:13:15.385+07	2021-03-25 18:13:15.385+07	\N	24	\N	\N
1366	MOBILE	2021-03-25 18:13:15.804+07	2021-03-25 18:13:15.804+07	\N	24	\N	\N
1367	BROWSER	2021-03-25 18:13:41.913+07	2021-03-25 18:13:41.913+07	\N	24	\N	\N
1368	MOBILE	2021-03-25 18:13:42.656+07	2021-03-25 18:13:42.656+07	\N	24	\N	\N
1369	BROWSER	2021-03-25 18:13:51.971+07	2021-03-25 18:13:51.971+07	\N	24	\N	\N
1370	MOBILE	2021-03-25 18:13:52.744+07	2021-03-25 18:13:52.744+07	\N	24	\N	\N
1371	BROWSER	2021-03-25 18:14:20.519+07	2021-03-25 18:14:20.519+07	\N	24	\N	\N
1372	MOBILE	2021-03-25 18:14:20.794+07	2021-03-25 18:14:20.794+07	\N	24	\N	\N
1373	MOBILE	2021-03-25 18:15:12.76+07	2021-03-25 18:15:12.76+07	\N	24	\N	\N
1374	BROWSER	2021-03-25 18:17:09.159+07	2021-03-25 18:17:09.159+07	\N	24	\N	\N
1375	MOBILE	2021-03-25 18:17:10.269+07	2021-03-25 18:17:10.269+07	\N	24	\N	\N
1376	BROWSER	2021-03-25 18:17:21.882+07	2021-03-25 18:17:21.882+07	\N	24	\N	\N
1377	BROWSER	2021-03-25 18:17:33.857+07	2021-03-25 18:17:33.857+07	\N	24	\N	\N
1378	BROWSER	2021-03-25 18:17:34.478+07	2021-03-25 18:17:34.478+07	\N	24	\N	\N
1379	BROWSER	2021-03-25 18:19:17.512+07	2021-03-25 18:19:17.512+07	1	24	\N	\N
1380	BROWSER	2021-03-25 18:19:18.817+07	2021-03-25 18:19:18.817+07	2	24	\N	\N
1381	BROWSER	2021-03-26 12:02:13.76+07	2021-03-26 12:02:13.76+07	\N	24	\N	\N
1382	BROWSER	2021-03-26 12:04:29.228+07	2021-03-26 12:04:29.228+07	\N	24	\N	\N
1383	BROWSER	2021-03-26 12:04:56.874+07	2021-03-26 12:04:56.874+07	\N	2	\N	\N
1384	BROWSER	2021-03-26 12:05:44.363+07	2021-03-26 12:05:44.363+07	\N	2	\N	\N
1385	BROWSER	2021-03-26 12:05:53.152+07	2021-03-26 12:05:53.152+07	2	2	\N	\N
1386	BROWSER	2021-03-26 12:06:27.223+07	2021-03-26 12:06:27.223+07	\N	2	\N	\N
1387	BROWSER	2021-03-26 12:06:27.414+07	2021-03-26 12:06:27.414+07	2	2	\N	\N
1388	BROWSER	2021-03-26 12:06:44.61+07	2021-03-26 12:06:44.61+07	\N	2	\N	\N
1389	BROWSER	2021-03-26 12:07:01.131+07	2021-03-26 12:07:01.131+07	\N	2	\N	\N
1390	BROWSER	2021-03-26 12:07:21.525+07	2021-03-26 12:07:21.525+07	\N	2	\N	\N
1391	BROWSER	2021-03-26 12:07:26.747+07	2021-03-26 12:07:26.747+07	\N	24	\N	\N
1392	BROWSER	2021-03-26 12:07:27.23+07	2021-03-26 12:07:27.23+07	2	24	\N	\N
1393	BROWSER	2021-03-26 12:07:35.006+07	2021-03-26 12:07:35.006+07	2	2	\N	\N
1394	BROWSER	2021-03-26 12:08:36.87+07	2021-03-26 12:08:36.87+07	1	2	\N	\N
1395	BROWSER	2021-03-26 12:08:46.66+07	2021-03-26 12:08:46.66+07	\N	2	\N	\N
1396	BROWSER	2021-03-26 12:08:46.82+07	2021-03-26 12:08:46.82+07	1	2	\N	\N
1397	BROWSER	2021-03-26 12:08:53.012+07	2021-03-26 12:08:53.012+07	1	24	\N	\N
1398	BROWSER	2021-03-26 12:09:01.49+07	2021-03-26 12:09:01.49+07	\N	24	\N	\N
1399	BROWSER	2021-03-26 12:09:01.86+07	2021-03-26 12:09:01.86+07	1	24	\N	\N
1400	BROWSER	2021-03-26 12:09:25.943+07	2021-03-26 12:09:25.943+07	\N	2	\N	\N
1401	BROWSER	2021-03-26 12:09:26.172+07	2021-03-26 12:09:26.172+07	1	2	\N	\N
1402	BROWSER	2021-03-26 12:11:10.476+07	2021-03-26 12:11:10.476+07	\N	2	\N	\N
1403	BROWSER	2021-03-26 12:11:32.143+07	2021-03-26 12:11:32.143+07	\N	2	\N	\N
1404	BROWSER	2021-03-26 12:11:59.781+07	2021-03-26 12:11:59.781+07	\N	24	\N	\N
1405	BROWSER	2021-03-26 12:12:11.444+07	2021-03-26 12:12:11.444+07	\N	2	\N	\N
1406	BROWSER	2021-03-26 12:12:40.906+07	2021-03-26 12:12:40.906+07	\N	2	\N	\N
1407	BROWSER	2021-03-26 12:13:54.172+07	2021-03-26 12:13:54.172+07	\N	2	\N	\N
1408	BROWSER	2021-03-26 12:13:55.31+07	2021-03-26 12:13:55.31+07	\N	24	\N	\N
1409	BROWSER	2021-03-26 12:14:02.515+07	2021-03-26 12:14:02.515+07	2	2	\N	\N
1410	BROWSER	2021-03-26 12:14:20.078+07	2021-03-26 12:14:20.078+07	\N	2	\N	\N
1411	BROWSER	2021-03-26 12:14:20.284+07	2021-03-26 12:14:20.284+07	2	2	\N	\N
1412	BROWSER	2021-03-27 09:38:03.583+07	2021-03-27 09:38:03.583+07	\N	24	\N	\N
1413	MOBILE	2021-03-27 09:38:20.537+07	2021-03-27 09:38:20.537+07	\N	24	\N	\N
1414	MOBILE	2021-03-27 09:38:33.787+07	2021-03-27 09:38:33.787+07	\N	24	\N	\N
1415	MOBILE	2021-03-27 09:39:08.675+07	2021-03-27 09:39:08.675+07	\N	24	\N	\N
1416	MOBILE	2021-03-27 09:39:47.919+07	2021-03-27 09:39:47.919+07	\N	24	\N	\N
1417	MOBILE	2021-03-27 09:41:08.152+07	2021-03-27 09:41:08.152+07	\N	24	\N	\N
1418	MOBILE	2021-03-27 09:41:55.166+07	2021-03-27 09:41:55.166+07	\N	24	\N	\N
1419	MOBILE	2021-03-27 09:47:30.508+07	2021-03-27 09:47:30.508+07	\N	24	\N	\N
1420	MOBILE	2021-03-27 09:47:42.721+07	2021-03-27 09:47:42.721+07	\N	24	\N	\N
1421	MOBILE	2021-03-27 09:50:02.594+07	2021-03-27 09:50:02.594+07	\N	24	\N	\N
1422	MOBILE	2021-03-27 09:51:24.693+07	2021-03-27 09:51:24.693+07	\N	24	\N	\N
1423	BROWSER	2021-03-27 09:55:28.084+07	2021-03-27 09:55:28.084+07	\N	24	\N	\N
1424	BROWSER	2021-03-27 09:56:27.157+07	2021-03-27 09:56:27.157+07	\N	24	\N	\N
1425	BROWSER	2021-03-27 09:56:59.205+07	2021-03-27 09:56:59.205+07	\N	24	\N	\N
1426	BROWSER	2021-03-27 10:00:54.439+07	2021-03-27 10:00:54.439+07	\N	24	\N	\N
1427	BROWSER	2021-03-27 10:01:02.687+07	2021-03-27 10:01:02.687+07	\N	24	\N	\N
1428	MOBILE	2021-03-27 10:02:32.766+07	2021-03-27 10:02:32.766+07	\N	24	\N	\N
1429	MOBILE	2021-03-27 10:05:57.012+07	2021-03-27 10:05:57.012+07	\N	24	\N	\N
1430	MOBILE	2021-03-27 10:06:01.405+07	2021-03-27 10:06:01.405+07	\N	24	\N	\N
1431	MOBILE	2021-03-27 10:07:46.033+07	2021-03-27 10:07:46.033+07	\N	24	\N	\N
1432	MOBILE	2021-03-27 10:09:02.582+07	2021-03-27 10:09:02.582+07	\N	24	\N	\N
1433	MOBILE	2021-03-27 10:14:40.691+07	2021-03-27 10:14:40.691+07	\N	24	\N	\N
1434	MOBILE	2021-03-27 10:14:52.129+07	2021-03-27 10:14:52.129+07	\N	24	\N	\N
1435	MOBILE	2021-03-27 10:15:38.267+07	2021-03-27 10:15:38.267+07	\N	24	\N	\N
1436	MOBILE	2021-03-27 10:16:20.522+07	2021-03-27 10:16:20.522+07	\N	24	\N	\N
1437	MOBILE	2021-03-27 10:16:53.274+07	2021-03-27 10:16:53.274+07	\N	24	\N	\N
1438	MOBILE	2021-03-27 10:18:52.356+07	2021-03-27 10:18:52.356+07	\N	24	\N	\N
1439	MOBILE	2021-03-27 10:19:07.993+07	2021-03-27 10:19:07.993+07	\N	24	\N	\N
1440	MOBILE	2021-03-27 10:19:24.745+07	2021-03-27 10:19:24.745+07	\N	24	\N	\N
1441	MOBILE	2021-03-27 10:19:36.046+07	2021-03-27 10:19:36.046+07	\N	24	\N	\N
1442	MOBILE	2021-03-27 10:20:03.539+07	2021-03-27 10:20:03.539+07	\N	24	\N	\N
1443	MOBILE	2021-03-27 10:24:04.895+07	2021-03-27 10:24:04.895+07	\N	24	\N	\N
1444	MOBILE	2021-03-27 10:24:53.204+07	2021-03-27 10:24:53.204+07	\N	24	\N	\N
1445	MOBILE	2021-03-27 10:25:12.203+07	2021-03-27 10:25:12.203+07	\N	24	\N	\N
1446	MOBILE	2021-03-27 10:25:38.512+07	2021-03-27 10:25:38.512+07	\N	24	\N	\N
1447	MOBILE	2021-03-27 10:26:50.126+07	2021-03-27 10:26:50.126+07	\N	24	\N	\N
1448	MOBILE	2021-03-27 10:29:10.122+07	2021-03-27 10:29:10.122+07	\N	24	\N	\N
1449	MOBILE	2021-03-27 10:30:19.584+07	2021-03-27 10:30:19.584+07	\N	24	\N	\N
1450	MOBILE	2021-03-27 10:30:46.589+07	2021-03-27 10:30:46.589+07	\N	24	\N	\N
1451	MOBILE	2021-03-27 10:31:11.556+07	2021-03-27 10:31:11.556+07	\N	24	\N	\N
1452	MOBILE	2021-03-27 10:31:52.142+07	2021-03-27 10:31:52.142+07	\N	24	\N	\N
1453	MOBILE	2021-03-27 10:34:52.188+07	2021-03-27 10:34:52.188+07	\N	24	\N	\N
1454	MOBILE	2021-03-27 10:35:14.406+07	2021-03-27 10:35:14.406+07	\N	24	\N	\N
1455	MOBILE	2021-03-27 10:36:11.003+07	2021-03-27 10:36:11.003+07	\N	24	\N	\N
1456	MOBILE	2021-03-27 10:37:11.75+07	2021-03-27 10:37:11.75+07	\N	24	\N	\N
1457	MOBILE	2021-03-27 10:37:16.229+07	2021-03-27 10:37:16.229+07	1	24	\N	\N
1458	MOBILE	2021-03-27 10:39:14.639+07	2021-03-27 10:39:14.639+07	\N	24	\N	\N
1459	MOBILE	2021-03-27 10:39:18.704+07	2021-03-27 10:39:18.704+07	1	24	\N	\N
1460	MOBILE	2021-03-27 10:39:37.073+07	2021-03-27 10:39:37.073+07	\N	24	\N	\N
1461	MOBILE	2021-03-27 10:39:37.323+07	2021-03-27 10:39:37.323+07	1	24	\N	\N
1462	MOBILE	2021-03-27 10:40:19.932+07	2021-03-27 10:40:19.932+07	\N	24	\N	\N
1463	MOBILE	2021-03-27 10:40:20.163+07	2021-03-27 10:40:20.163+07	1	24	\N	\N
1464	MOBILE	2021-03-27 10:40:25.931+07	2021-03-27 10:40:25.931+07	1	24	\N	\N
1465	MOBILE	2021-03-27 10:42:25.119+07	2021-03-27 10:42:25.119+07	\N	24	\N	\N
1466	MOBILE	2021-03-27 10:42:31.059+07	2021-03-27 10:42:31.059+07	1	24	\N	\N
1467	MOBILE	2021-03-27 10:43:05.597+07	2021-03-27 10:43:05.597+07	\N	24	\N	\N
1468	MOBILE	2021-03-27 10:43:11.617+07	2021-03-27 10:43:11.617+07	2	24	\N	\N
1469	MOBILE	2021-03-27 10:43:23.747+07	2021-03-27 10:43:23.747+07	2	24	\N	\N
1470	MOBILE	2021-03-27 10:43:33.753+07	2021-03-27 10:43:33.753+07	\N	24	\N	\N
1471	MOBILE	2021-03-27 10:43:38.258+07	2021-03-27 10:43:38.258+07	2	24	\N	\N
1472	MOBILE	2021-03-27 10:44:23.928+07	2021-03-27 10:44:23.928+07	\N	24	\N	\N
1473	MOBILE	2021-03-27 10:44:24.088+07	2021-03-27 10:44:24.088+07	2	24	\N	\N
1474	MOBILE	2021-03-27 10:44:42.976+07	2021-03-27 10:44:42.976+07	\N	24	\N	\N
1475	MOBILE	2021-03-27 10:44:43.182+07	2021-03-27 10:44:43.182+07	2	24	\N	\N
1476	MOBILE	2021-03-27 10:47:21.842+07	2021-03-27 10:47:21.842+07	\N	24	\N	\N
1477	MOBILE	2021-03-27 10:47:22.221+07	2021-03-27 10:47:22.221+07	2	24	\N	\N
1478	BROWSER	2021-03-27 10:48:00.231+07	2021-03-27 10:48:00.231+07	\N	24	\N	\N
1479	BROWSER	2021-03-27 10:48:00.637+07	2021-03-27 10:48:00.637+07	2	24	\N	\N
1480	BROWSER	2021-03-27 10:48:08.266+07	2021-03-27 10:48:08.266+07	\N	24	\N	\N
1481	BROWSER	2021-03-27 10:48:08.504+07	2021-03-27 10:48:08.504+07	2	24	\N	\N
1482	BROWSER	2021-03-27 10:48:17.599+07	2021-03-27 10:48:17.599+07	\N	24	\N	\N
1483	BROWSER	2021-03-27 10:48:17.874+07	2021-03-27 10:48:17.874+07	2	24	\N	\N
1484	MOBILE	2021-03-27 10:53:45.596+07	2021-03-27 10:53:45.596+07	\N	24	\N	\N
1485	MOBILE	2021-03-27 10:53:45.907+07	2021-03-27 10:53:45.907+07	2	24	\N	\N
1486	MOBILE	2021-03-27 10:54:38.636+07	2021-03-27 10:54:38.636+07	\N	24	\N	\N
1487	MOBILE	2021-03-27 10:54:39.047+07	2021-03-27 10:54:39.047+07	2	24	\N	\N
1488	MOBILE	2021-03-27 10:56:35.022+07	2021-03-27 10:56:35.022+07	\N	24	\N	\N
1489	MOBILE	2021-03-27 10:56:35.293+07	2021-03-27 10:56:35.293+07	2	24	\N	\N
1490	MOBILE	2021-03-27 10:56:49.929+07	2021-03-27 10:56:49.929+07	1	24	\N	\N
1491	MOBILE	2021-03-27 10:58:24.105+07	2021-03-27 10:58:24.105+07	\N	24	\N	\N
1492	MOBILE	2021-03-27 10:58:24.773+07	2021-03-27 10:58:24.773+07	1	24	\N	\N
1493	MOBILE	2021-03-27 10:59:25.085+07	2021-03-27 10:59:25.085+07	\N	24	\N	\N
1494	MOBILE	2021-03-27 10:59:25.91+07	2021-03-27 10:59:25.91+07	1	24	\N	\N
1495	MOBILE	2021-03-27 10:59:32.016+07	2021-03-27 10:59:32.016+07	\N	24	\N	\N
1496	MOBILE	2021-03-27 10:59:32.434+07	2021-03-27 10:59:32.434+07	1	24	\N	\N
1497	MOBILE	2021-03-27 11:00:52.252+07	2021-03-27 11:00:52.252+07	\N	24	\N	\N
1498	MOBILE	2021-03-27 11:00:52.861+07	2021-03-27 11:00:52.861+07	1	24	\N	\N
1499	MOBILE	2021-03-27 11:01:02.412+07	2021-03-27 11:01:02.412+07	\N	24	\N	\N
1500	MOBILE	2021-03-27 11:01:02.748+07	2021-03-27 11:01:02.748+07	1	24	\N	\N
1501	MOBILE	2021-03-27 11:01:06.181+07	2021-03-27 11:01:06.181+07	2	24	\N	\N
1502	MOBILE	2021-03-27 11:01:07.192+07	2021-03-27 11:01:07.192+07	1	24	\N	\N
1503	MOBILE	2021-03-27 11:01:35.451+07	2021-03-27 11:01:35.451+07	\N	24	\N	\N
1504	MOBILE	2021-03-27 11:02:02.334+07	2021-03-27 11:02:02.334+07	\N	24	\N	\N
1505	MOBILE	2021-03-27 11:02:19.119+07	2021-03-27 11:02:19.119+07	\N	24	\N	\N
1506	MOBILE	2021-03-27 11:02:33.846+07	2021-03-27 11:02:33.846+07	\N	24	\N	\N
1507	MOBILE	2021-03-27 11:02:51.331+07	2021-03-27 11:02:51.331+07	\N	24	\N	\N
1508	MOBILE	2021-03-27 11:03:37.738+07	2021-03-27 11:03:37.738+07	\N	24	\N	\N
1509	BROWSER	2021-03-27 11:03:57.427+07	2021-03-27 11:03:57.427+07	\N	24	\N	\N
1510	MOBILE	2021-03-27 11:05:11.913+07	2021-03-27 11:05:11.913+07	\N	24	\N	\N
1511	MOBILE	2021-03-27 11:05:32.155+07	2021-03-27 11:05:32.155+07	1	24	\N	\N
1512	BROWSER	2021-03-27 11:05:44.627+07	2021-03-27 11:05:44.627+07	\N	24	\N	\N
1513	BROWSER	2021-03-27 11:05:46.803+07	2021-03-27 11:05:46.803+07	\N	24	\N	\N
1514	MOBILE	2021-03-27 11:06:59.944+07	2021-03-27 11:06:59.944+07	\N	24	\N	\N
1515	MOBILE	2021-03-27 11:07:05.579+07	2021-03-27 11:07:05.579+07	\N	24	\N	\N
1516	MOBILE	2021-03-27 11:07:56.863+07	2021-03-27 11:07:56.863+07	\N	24	\N	\N
1517	MOBILE	2021-03-27 11:08:02.749+07	2021-03-27 11:08:02.749+07	\N	24	\N	\N
1518	MOBILE	2021-03-27 11:08:05.729+07	2021-03-27 11:08:05.729+07	\N	24	\N	\N
1519	MOBILE	2021-03-27 11:08:08.463+07	2021-03-27 11:08:08.463+07	1	24	\N	\N
1520	MOBILE	2021-03-27 11:08:49.08+07	2021-03-27 11:08:49.08+07	\N	24	\N	\N
1521	MOBILE	2021-03-27 11:08:49.353+07	2021-03-27 11:08:49.353+07	1	24	\N	\N
1522	MOBILE	2021-03-27 11:08:53.283+07	2021-03-27 11:08:53.283+07	\N	24	\N	\N
1523	MOBILE	2021-03-27 11:08:56.735+07	2021-03-27 11:08:56.735+07	2	24	\N	\N
1524	MOBILE	2021-03-27 11:09:51.823+07	2021-03-27 11:09:51.823+07	\N	24	\N	\N
1525	MOBILE	2021-03-27 11:09:56.198+07	2021-03-27 11:09:56.198+07	\N	24	\N	\N
1526	MOBILE	2021-03-27 11:10:23.767+07	2021-03-27 11:10:23.767+07	\N	24	\N	\N
1527	MOBILE	2021-03-27 11:10:26.683+07	2021-03-27 11:10:26.683+07	\N	24	\N	\N
1528	MOBILE	2021-03-27 11:11:36.434+07	2021-03-27 11:11:36.434+07	\N	24	\N	\N
1529	MOBILE	2021-03-27 11:11:41.872+07	2021-03-27 11:11:41.872+07	\N	24	\N	\N
1530	MOBILE	2021-03-27 11:12:53.92+07	2021-03-27 11:12:53.92+07	\N	24	\N	\N
1531	MOBILE	2021-03-27 11:13:09.456+07	2021-03-27 11:13:09.456+07	\N	24	\N	\N
1532	MOBILE	2021-03-27 11:13:21.44+07	2021-03-27 11:13:21.44+07	\N	24	\N	\N
1533	MOBILE	2021-03-27 11:13:34.21+07	2021-03-27 11:13:34.21+07	\N	24	\N	\N
1534	MOBILE	2021-03-27 11:14:01.98+07	2021-03-27 11:14:01.98+07	\N	24	\N	\N
1535	MOBILE	2021-03-27 11:14:14.528+07	2021-03-27 11:14:14.528+07	\N	24	\N	\N
1536	MOBILE	2021-03-27 11:14:44.656+07	2021-03-27 11:14:44.656+07	\N	24	\N	\N
1537	MOBILE	2021-03-27 11:14:55.781+07	2021-03-27 11:14:55.781+07	\N	24	\N	\N
1538	MOBILE	2021-03-27 11:15:14.787+07	2021-03-27 11:15:14.787+07	\N	24	\N	\N
1539	MOBILE	2021-03-27 11:15:25.576+07	2021-03-27 11:15:25.576+07	\N	24	\N	\N
1540	MOBILE	2021-03-27 11:15:42.302+07	2021-03-27 11:15:42.302+07	\N	24	\N	\N
1541	MOBILE	2021-03-27 11:16:00.488+07	2021-03-27 11:16:00.488+07	\N	24	\N	\N
1542	MOBILE	2021-03-27 11:16:38.858+07	2021-03-27 11:16:38.858+07	\N	24	\N	\N
1543	MOBILE	2021-03-27 11:16:58.773+07	2021-03-27 11:16:58.773+07	\N	24	\N	\N
1544	MOBILE	2021-03-27 11:17:05.21+07	2021-03-27 11:17:05.21+07	\N	24	\N	\N
1545	MOBILE	2021-03-27 11:17:13.788+07	2021-03-27 11:17:13.788+07	1	24	\N	\N
1546	MOBILE	2021-03-27 11:17:15.687+07	2021-03-27 11:17:15.687+07	2	24	\N	\N
1547	BROWSER	2021-03-27 11:18:24.955+07	2021-03-27 11:18:24.955+07	\N	24	\N	\N
1548	BROWSER	2021-03-27 11:19:11.864+07	2021-03-27 11:19:11.864+07	\N	24	\N	\N
1549	BROWSER	2021-03-27 11:21:29.226+07	2021-03-27 11:21:29.226+07	\N	24	\N	\N
1550	BROWSER	2021-03-27 11:21:54.702+07	2021-03-27 11:21:54.702+07	\N	24	\N	\N
1551	BROWSER	2021-03-27 11:22:17.489+07	2021-03-27 11:22:17.489+07	\N	24	\N	\N
1552	MOBILE	2021-03-27 11:23:31.169+07	2021-03-27 11:23:31.169+07	\N	24	\N	\N
1553	MOBILE	2021-03-27 11:24:06.024+07	2021-03-27 11:24:06.024+07	\N	24	\N	\N
1554	BROWSER	2021-03-27 11:24:26.142+07	2021-03-27 11:24:26.142+07	\N	24	\N	\N
1555	MOBILE	2021-03-27 11:26:23.541+07	2021-03-27 11:26:23.541+07	\N	24	\N	\N
1556	MOBILE	2021-03-27 11:26:40.413+07	2021-03-27 11:26:40.413+07	\N	24	\N	\N
1557	BROWSER	2021-03-27 11:29:02.039+07	2021-03-27 11:29:02.039+07	\N	24	\N	\N
1558	MOBILE	2021-03-27 11:29:12.657+07	2021-03-27 11:29:12.657+07	\N	24	\N	\N
1559	BROWSER	2021-03-27 11:29:18.924+07	2021-03-27 11:29:18.924+07	\N	24	\N	\N
1560	MOBILE	2021-03-27 11:29:28.284+07	2021-03-27 11:29:28.284+07	\N	24	\N	\N
1561	MOBILE	2021-03-27 11:29:41.677+07	2021-03-27 11:29:41.677+07	\N	24	\N	\N
1562	BROWSER	2021-03-27 11:29:51.899+07	2021-03-27 11:29:51.899+07	\N	24	\N	\N
1563	MOBILE	2021-03-27 11:32:57.45+07	2021-03-27 11:32:57.45+07	\N	24	\N	\N
1564	MOBILE	2021-03-27 11:32:59.036+07	2021-03-27 11:32:59.036+07	\N	24	\N	\N
1565	MOBILE	2021-03-27 11:33:13.083+07	2021-03-27 11:33:13.083+07	\N	24	\N	\N
1566	MOBILE	2021-03-27 11:33:13.332+07	2021-03-27 11:33:13.332+07	\N	24	\N	\N
1567	MOBILE	2021-03-27 11:33:44.801+07	2021-03-27 11:33:44.801+07	\N	24	\N	\N
1568	MOBILE	2021-03-27 11:33:45.425+07	2021-03-27 11:33:45.425+07	\N	24	\N	\N
1569	MOBILE	2021-03-27 11:34:06.129+07	2021-03-27 11:34:06.129+07	1	24	\N	\N
1570	MOBILE	2021-03-27 11:34:07.722+07	2021-03-27 11:34:07.722+07	2	24	\N	\N
1571	MOBILE	2021-03-27 11:35:26.802+07	2021-03-27 11:35:26.802+07	\N	24	\N	\N
1572	MOBILE	2021-03-27 11:35:27.269+07	2021-03-27 11:35:27.269+07	\N	24	\N	\N
1573	MOBILE	2021-03-27 11:35:54.817+07	2021-03-27 11:35:54.817+07	\N	24	\N	\N
1574	MOBILE	2021-03-27 11:35:55.241+07	2021-03-27 11:35:55.241+07	\N	24	\N	\N
1575	MOBILE	2021-03-27 11:35:59.841+07	2021-03-27 11:35:59.841+07	1	24	\N	\N
1576	MOBILE	2021-03-27 11:36:26.688+07	2021-03-27 11:36:26.688+07	\N	24	\N	\N
1577	MOBILE	2021-03-27 11:37:01.642+07	2021-03-27 11:37:01.642+07	2	24	\N	\N
1578	MOBILE	2021-03-27 11:40:06.361+07	2021-03-27 11:40:06.361+07	1	24	\N	\N
1579	MOBILE	2021-03-27 11:42:03.869+07	2021-03-27 11:42:03.869+07	\N	24	\N	\N
1580	MOBILE	2021-03-27 11:42:04.083+07	2021-03-27 11:42:04.083+07	\N	24	\N	\N
1581	MOBILE	2021-03-27 11:42:04.808+07	2021-03-27 11:42:04.808+07	2	24	\N	\N
1582	MOBILE	2021-03-27 11:42:04.433+07	2021-03-27 11:42:04.433+07	1	24	\N	\N
1583	MOBILE	2021-03-27 11:42:16.398+07	2021-03-27 11:42:16.398+07	\N	24	\N	\N
1584	MOBILE	2021-03-27 11:42:16.744+07	2021-03-27 11:42:16.744+07	2	24	\N	\N
1585	MOBILE	2021-03-27 11:42:16.958+07	2021-03-27 11:42:16.958+07	\N	24	\N	\N
1586	MOBILE	2021-03-27 11:42:17.201+07	2021-03-27 11:42:17.201+07	1	24	\N	\N
1587	MOBILE	2021-03-27 11:42:38.174+07	2021-03-27 11:42:38.174+07	\N	24	\N	\N
1588	MOBILE	2021-03-27 11:42:38.134+07	2021-03-27 11:42:38.134+07	\N	24	\N	\N
1589	MOBILE	2021-03-27 11:42:38.479+07	2021-03-27 11:42:38.479+07	2	24	\N	\N
1590	MOBILE	2021-03-27 11:42:38.739+07	2021-03-27 11:42:38.739+07	1	24	\N	\N
1591	MOBILE	2021-03-27 11:43:07.261+07	2021-03-27 11:43:07.261+07	\N	24	\N	\N
1592	MOBILE	2021-03-27 11:43:07.372+07	2021-03-27 11:43:07.372+07	\N	24	\N	\N
1593	MOBILE	2021-03-27 11:43:07.652+07	2021-03-27 11:43:07.652+07	1	24	\N	\N
1594	MOBILE	2021-03-27 11:43:07.704+07	2021-03-27 11:43:07.704+07	2	24	\N	\N
1595	MOBILE	2021-03-27 11:43:35.586+07	2021-03-27 11:43:35.586+07	\N	24	\N	\N
1596	MOBILE	2021-03-27 11:43:36.256+07	2021-03-27 11:43:36.256+07	\N	24	\N	\N
1597	MOBILE	2021-03-27 11:43:36.102+07	2021-03-27 11:43:36.102+07	1	24	\N	\N
1598	MOBILE	2021-03-27 11:43:36.923+07	2021-03-27 11:43:36.923+07	2	24	\N	\N
1599	MOBILE	2021-03-27 11:44:29.724+07	2021-03-27 11:44:29.724+07	\N	24	\N	\N
1600	MOBILE	2021-03-27 11:44:29.746+07	2021-03-27 11:44:29.746+07	\N	24	\N	\N
1601	MOBILE	2021-03-27 11:44:30.04+07	2021-03-27 11:44:30.04+07	2	24	\N	\N
1602	MOBILE	2021-03-27 11:44:30.087+07	2021-03-27 11:44:30.087+07	1	24	\N	\N
1603	MOBILE	2021-03-27 11:45:45.925+07	2021-03-27 11:45:45.925+07	\N	24	\N	\N
1604	MOBILE	2021-03-27 11:45:46.372+07	2021-03-27 11:45:46.372+07	2	24	\N	\N
1605	MOBILE	2021-03-27 11:45:46.596+07	2021-03-27 11:45:46.596+07	\N	24	\N	\N
1606	MOBILE	2021-03-27 11:45:46.841+07	2021-03-27 11:45:46.841+07	1	24	\N	\N
1607	MOBILE	2021-03-27 11:47:22.685+07	2021-03-27 11:47:22.685+07	\N	24	\N	\N
1608	MOBILE	2021-03-27 11:47:23.021+07	2021-03-27 11:47:23.021+07	\N	24	\N	\N
1609	MOBILE	2021-03-27 11:47:23.173+07	2021-03-27 11:47:23.173+07	1	24	\N	\N
1610	MOBILE	2021-03-27 11:47:48.561+07	2021-03-27 11:47:48.561+07	\N	24	\N	\N
1611	MOBILE	2021-03-27 11:47:48.797+07	2021-03-27 11:47:48.797+07	\N	24	\N	\N
1612	MOBILE	2021-03-27 11:47:48.981+07	2021-03-27 11:47:48.981+07	1	24	\N	\N
1613	MOBILE	2021-03-27 11:49:05.211+07	2021-03-27 11:49:05.211+07	\N	24	\N	\N
1614	MOBILE	2021-03-27 11:49:05.482+07	2021-03-27 11:49:05.482+07	\N	24	\N	\N
1615	MOBILE	2021-03-27 11:49:05.781+07	2021-03-27 11:49:05.781+07	1	24	\N	\N
1616	MOBILE	2021-03-27 11:49:33.639+07	2021-03-27 11:49:33.639+07	\N	24	\N	\N
1617	MOBILE	2021-03-27 11:49:34.348+07	2021-03-27 11:49:34.348+07	\N	24	\N	\N
1618	MOBILE	2021-03-27 11:49:34.71+07	2021-03-27 11:49:34.71+07	1	24	\N	\N
1619	MOBILE	2021-03-27 11:49:49.169+07	2021-03-27 11:49:49.169+07	\N	24	\N	\N
1620	MOBILE	2021-03-27 11:49:49.558+07	2021-03-27 11:49:49.558+07	\N	24	\N	\N
1621	MOBILE	2021-03-27 11:49:50.036+07	2021-03-27 11:49:50.036+07	1	24	\N	\N
1622	MOBILE	2021-03-27 11:49:58.563+07	2021-03-27 11:49:58.563+07	\N	24	\N	\N
1623	BROWSER	2021-03-27 11:50:59.927+07	2021-03-27 11:50:59.927+07	\N	24	\N	\N
1624	BROWSER	2021-03-27 11:51:25.056+07	2021-03-27 11:51:25.056+07	\N	24	\N	\N
1625	BROWSER	2021-03-27 11:51:55.292+07	2021-03-27 11:51:55.292+07	\N	24	\N	\N
1626	BROWSER	2021-03-27 11:52:34.208+07	2021-03-27 11:52:34.208+07	\N	24	\N	\N
1627	BROWSER	2021-03-27 11:53:21.014+07	2021-03-27 11:53:21.014+07	\N	24	\N	\N
1628	BROWSER	2021-03-27 11:53:54.63+07	2021-03-27 11:53:54.63+07	\N	24	\N	\N
1629	BROWSER	2021-03-27 11:54:04.604+07	2021-03-27 11:54:04.604+07	\N	24	\N	\N
1630	BROWSER	2021-03-27 11:54:42.863+07	2021-03-27 11:54:42.863+07	\N	24	\N	\N
1631	BROWSER	2021-03-27 11:56:45.254+07	2021-03-27 11:56:45.254+07	\N	24	\N	\N
1632	BROWSER	2021-03-27 11:56:55.5+07	2021-03-27 11:56:55.5+07	\N	24	\N	\N
1633	BROWSER	2021-03-27 11:57:25.629+07	2021-03-27 11:57:25.629+07	\N	24	\N	\N
1634	BROWSER	2021-03-27 11:58:01.72+07	2021-03-27 11:58:01.72+07	\N	24	\N	\N
1635	MOBILE	2021-03-27 11:58:20.61+07	2021-03-27 11:58:20.61+07	1	24	\N	\N
1636	BROWSER	2021-03-27 11:58:38.191+07	2021-03-27 11:58:38.191+07	\N	24	\N	\N
1637	BROWSER	2021-03-27 11:58:57.675+07	2021-03-27 11:58:57.675+07	\N	1	\N	\N
1638	BROWSER	2021-03-27 11:59:06.29+07	2021-03-27 11:59:06.29+07	\N	2	\N	\N
1639	BROWSER	2021-03-27 11:59:15.888+07	2021-03-27 11:59:15.888+07	1	24	\N	\N
1640	BROWSER	2021-03-27 11:59:41.033+07	2021-03-27 11:59:41.033+07	\N	24	\N	\N
1641	BROWSER	2021-03-27 11:59:41.181+07	2021-03-27 11:59:41.181+07	1	24	\N	\N
1642	BROWSER	2021-03-27 11:59:54.362+07	2021-03-27 11:59:54.362+07	\N	24	\N	\N
1643	BROWSER	2021-03-27 11:59:54.572+07	2021-03-27 11:59:54.572+07	1	24	\N	\N
1644	BROWSER	2021-03-27 12:00:27.954+07	2021-03-27 12:00:27.954+07	\N	24	\N	\N
1645	BROWSER	2021-03-27 12:00:28.227+07	2021-03-27 12:00:28.227+07	1	24	\N	\N
1646	BROWSER	2021-03-27 12:02:07.804+07	2021-03-27 12:02:07.804+07	\N	2	\N	\N
1647	BROWSER	2021-03-27 12:02:08.456+07	2021-03-27 12:02:08.456+07	\N	24	\N	\N
1648	BROWSER	2021-03-27 12:02:08.783+07	2021-03-27 12:02:08.783+07	1	24	\N	\N
1649	BROWSER	2021-03-27 12:04:07.424+07	2021-03-27 12:04:07.424+07	\N	2	\N	\N
1650	BROWSER	2021-03-27 12:04:08.343+07	2021-03-27 12:04:08.343+07	\N	24	\N	\N
1651	BROWSER	2021-03-27 12:04:08.57+07	2021-03-27 12:04:08.57+07	1	24	\N	\N
1652	BROWSER	2021-03-27 12:04:51.158+07	2021-03-27 12:04:51.158+07	\N	2	\N	\N
1653	MOBILE	2021-03-27 12:04:52.082+07	2021-03-27 12:04:52.082+07	\N	24	\N	\N
1654	MOBILE	2021-03-27 12:04:52.21+07	2021-03-27 12:04:52.21+07	1	24	\N	\N
1655	BROWSER	2021-03-27 12:05:23.121+07	2021-03-27 12:05:23.121+07	\N	2	\N	\N
1656	MOBILE	2021-03-27 12:05:23.893+07	2021-03-27 12:05:23.893+07	\N	24	\N	\N
1657	MOBILE	2021-03-27 12:05:24.023+07	2021-03-27 12:05:24.023+07	1	24	\N	\N
1658	BROWSER	2021-03-27 12:05:41.353+07	2021-03-27 12:05:41.353+07	\N	2	\N	\N
1659	MOBILE	2021-03-27 12:05:42.581+07	2021-03-27 12:05:42.581+07	\N	24	\N	\N
1660	MOBILE	2021-03-27 12:05:42.812+07	2021-03-27 12:05:42.812+07	1	24	\N	\N
1661	BROWSER	2021-03-27 12:06:40.656+07	2021-03-27 12:06:40.656+07	\N	2	\N	\N
1662	MOBILE	2021-03-27 12:06:41.815+07	2021-03-27 12:06:41.815+07	\N	24	\N	\N
1663	MOBILE	2021-03-27 12:06:41.955+07	2021-03-27 12:06:41.955+07	1	24	\N	\N
1664	BROWSER	2021-03-27 12:07:57.422+07	2021-03-27 12:07:57.422+07	\N	2	\N	\N
1665	MOBILE	2021-03-27 12:07:58.435+07	2021-03-27 12:07:58.435+07	\N	24	\N	\N
1666	MOBILE	2021-03-27 12:07:58.803+07	2021-03-27 12:07:58.803+07	1	24	\N	\N
1667	BROWSER	2021-03-27 12:08:06.189+07	2021-03-27 12:08:06.189+07	\N	2	\N	\N
1668	MOBILE	2021-03-27 12:08:07.63+07	2021-03-27 12:08:07.63+07	\N	24	\N	\N
1669	BROWSER	2021-03-27 12:08:09.473+07	2021-03-27 12:08:09.473+07	\N	2	\N	\N
1670	MOBILE	2021-03-27 12:08:11.051+07	2021-03-27 12:08:11.051+07	\N	24	\N	\N
1671	MOBILE	2021-03-27 12:08:11.565+07	2021-03-27 12:08:11.565+07	1	24	\N	\N
1672	BROWSER	2021-03-27 12:09:02.763+07	2021-03-27 12:09:02.763+07	\N	2	\N	\N
1673	MOBILE	2021-03-27 12:09:03.679+07	2021-03-27 12:09:03.679+07	\N	24	\N	\N
1674	MOBILE	2021-03-27 12:09:03.836+07	2021-03-27 12:09:03.836+07	1	24	\N	\N
1675	BROWSER	2021-03-27 12:09:41.972+07	2021-03-27 12:09:41.972+07	\N	2	\N	\N
1676	BROWSER	2021-03-27 12:09:42.946+07	2021-03-27 12:09:42.946+07	\N	24	\N	\N
1677	BROWSER	2021-03-27 12:09:43.369+07	2021-03-27 12:09:43.369+07	1	24	\N	\N
1678	BROWSER	2021-03-27 12:11:34.091+07	2021-03-27 12:11:34.091+07	\N	2	\N	\N
1679	MOBILE	2021-03-27 12:11:35.963+07	2021-03-27 12:11:35.963+07	\N	24	\N	\N
1680	MOBILE	2021-03-27 12:11:36.258+07	2021-03-27 12:11:36.258+07	1	24	\N	\N
1681	BROWSER	2021-03-27 12:12:10.955+07	2021-03-27 12:12:10.955+07	\N	2	\N	\N
1682	MOBILE	2021-03-27 12:12:12.055+07	2021-03-27 12:12:12.055+07	\N	24	\N	\N
1683	MOBILE	2021-03-27 12:12:12.441+07	2021-03-27 12:12:12.441+07	1	24	\N	\N
1684	BROWSER	2021-03-27 12:13:06.292+07	2021-03-27 12:13:06.292+07	\N	2	\N	\N
1685	MOBILE	2021-03-27 12:13:06.73+07	2021-03-27 12:13:06.73+07	\N	24	\N	\N
1686	MOBILE	2021-03-27 12:13:06.891+07	2021-03-27 12:13:06.891+07	1	24	\N	\N
1687	BROWSER	2021-03-27 12:13:43.296+07	2021-03-27 12:13:43.296+07	\N	2	\N	\N
1688	MOBILE	2021-03-27 12:13:44.329+07	2021-03-27 12:13:44.329+07	\N	24	\N	\N
1689	MOBILE	2021-03-27 12:13:44.632+07	2021-03-27 12:13:44.632+07	1	24	\N	\N
1690	BROWSER	2021-03-27 12:14:28.435+07	2021-03-27 12:14:28.435+07	\N	2	\N	\N
1691	MOBILE	2021-03-27 12:14:29.811+07	2021-03-27 12:14:29.811+07	\N	24	\N	\N
1692	MOBILE	2021-03-27 12:14:30.045+07	2021-03-27 12:14:30.045+07	1	24	\N	\N
1693	BROWSER	2021-03-27 12:15:33.949+07	2021-03-27 12:15:33.949+07	\N	2	\N	\N
1694	MOBILE	2021-03-27 12:15:34.896+07	2021-03-27 12:15:34.896+07	\N	24	\N	\N
1695	MOBILE	2021-03-27 12:15:35.164+07	2021-03-27 12:15:35.164+07	1	24	\N	\N
1696	BROWSER	2021-03-27 12:17:03.589+07	2021-03-27 12:17:03.589+07	\N	2	\N	\N
1697	MOBILE	2021-03-27 12:17:05.973+07	2021-03-27 12:17:05.973+07	\N	24	\N	\N
1698	BROWSER	2021-03-27 12:17:06.184+07	2021-03-27 12:17:06.184+07	\N	2	\N	\N
1699	MOBILE	2021-03-27 12:17:06.493+07	2021-03-27 12:17:06.493+07	1	24	\N	\N
1700	BROWSER	2021-03-27 12:17:48.375+07	2021-03-27 12:17:48.375+07	\N	2	\N	\N
1701	MOBILE	2021-03-27 12:17:49.532+07	2021-03-27 12:17:49.532+07	\N	24	\N	\N
1702	MOBILE	2021-03-27 12:17:49.714+07	2021-03-27 12:17:49.714+07	1	24	\N	\N
1703	BROWSER	2021-03-27 12:18:47.68+07	2021-03-27 12:18:47.68+07	\N	2	\N	\N
1704	MOBILE	2021-03-27 12:18:48.524+07	2021-03-27 12:18:48.524+07	\N	24	\N	\N
1705	MOBILE	2021-03-27 12:18:48.789+07	2021-03-27 12:18:48.789+07	1	24	\N	\N
1706	BROWSER	2021-03-27 12:19:19.6+07	2021-03-27 12:19:19.6+07	\N	2	\N	\N
1707	MOBILE	2021-03-27 12:19:20.784+07	2021-03-27 12:19:20.784+07	\N	24	\N	\N
1708	MOBILE	2021-03-27 12:19:20.948+07	2021-03-27 12:19:20.948+07	1	24	\N	\N
1709	BROWSER	2021-03-27 12:19:56.497+07	2021-03-27 12:19:56.497+07	\N	2	\N	\N
1710	MOBILE	2021-03-27 12:19:57.039+07	2021-03-27 12:19:57.039+07	\N	24	\N	\N
1711	MOBILE	2021-03-27 12:19:57.284+07	2021-03-27 12:19:57.284+07	1	24	\N	\N
1712	BROWSER	2021-03-27 12:20:44.352+07	2021-03-27 12:20:44.352+07	\N	2	\N	\N
1713	MOBILE	2021-03-27 12:20:45.743+07	2021-03-27 12:20:45.743+07	\N	24	\N	\N
1714	MOBILE	2021-03-27 12:20:46.139+07	2021-03-27 12:20:46.139+07	1	24	\N	\N
1715	BROWSER	2021-03-27 12:27:39.626+07	2021-03-27 12:27:39.626+07	\N	2	\N	\N
1716	BROWSER	2021-03-27 12:28:42.171+07	2021-03-27 12:28:42.171+07	\N	2	\N	\N
1717	MOBILE	2021-03-27 12:29:12.755+07	2021-03-27 12:29:12.755+07	\N	2	\N	\N
1718	MOBILE	2021-03-27 12:30:36.504+07	2021-03-27 12:30:36.504+07	\N	24	\N	\N
1719	MOBILE	2021-03-27 12:30:36.637+07	2021-03-27 12:30:36.637+07	1	24	\N	\N
1720	MOBILE	2021-03-27 12:30:44.171+07	2021-03-27 12:30:44.171+07	\N	24	\N	\N
1721	MOBILE	2021-03-27 12:30:46.377+07	2021-03-27 12:30:46.377+07	1	24	\N	\N
1722	MOBILE	2021-03-27 12:30:49.31+07	2021-03-27 12:30:49.31+07	\N	2	\N	\N
1723	BROWSER	2021-03-27 12:38:49.569+07	2021-03-27 12:38:49.569+07	\N	24	\N	\N
1724	MOBILE	2021-03-27 14:41:02.379+07	2021-03-27 14:41:02.379+07	\N	24	\N	\N
1725	MOBILE	2021-03-27 14:41:06.19+07	2021-03-27 14:41:06.19+07	1	24	\N	\N
1726	MOBILE	2021-03-27 14:41:16.838+07	2021-03-27 14:41:16.838+07	2	24	\N	\N
1727	MOBILE	2021-03-27 14:41:23.768+07	2021-03-27 14:41:23.768+07	1	24	\N	\N
1728	MOBILE	2021-03-27 14:42:04.028+07	2021-03-27 14:42:04.028+07	\N	24	\N	\N
1729	MOBILE	2021-03-27 14:42:04.484+07	2021-03-27 14:42:04.484+07	1	24	\N	\N
1730	MOBILE	2021-03-27 14:42:27.806+07	2021-03-27 14:42:27.806+07	\N	24	\N	\N
1731	MOBILE	2021-03-27 14:42:28.033+07	2021-03-27 14:42:28.033+07	1	24	\N	\N
1732	MOBILE	2021-03-27 14:43:06.677+07	2021-03-27 14:43:06.677+07	\N	24	\N	\N
1733	MOBILE	2021-03-27 14:43:06.91+07	2021-03-27 14:43:06.91+07	1	24	\N	\N
1734	MOBILE	2021-03-27 14:43:19.081+07	2021-03-27 14:43:19.081+07	\N	24	\N	\N
1735	MOBILE	2021-03-27 14:43:19.411+07	2021-03-27 14:43:19.411+07	1	24	\N	\N
1736	MOBILE	2021-03-27 14:44:44.468+07	2021-03-27 14:44:44.468+07	\N	24	\N	\N
1737	MOBILE	2021-03-27 14:44:44.631+07	2021-03-27 14:44:44.631+07	1	24	\N	\N
1738	MOBILE	2021-03-27 14:45:31.41+07	2021-03-27 14:45:31.41+07	\N	24	\N	\N
1739	MOBILE	2021-03-27 14:45:31.7+07	2021-03-27 14:45:31.7+07	1	24	\N	\N
1740	MOBILE	2021-03-27 14:47:31.448+07	2021-03-27 14:47:31.448+07	\N	24	\N	\N
1741	MOBILE	2021-03-27 14:47:33.522+07	2021-03-27 14:47:33.522+07	1	24	\N	\N
1742	MOBILE	2021-03-27 14:48:12.328+07	2021-03-27 14:48:12.328+07	\N	24	\N	\N
1743	MOBILE	2021-03-27 14:48:12.642+07	2021-03-27 14:48:12.642+07	1	24	\N	\N
1744	MOBILE	2021-03-27 14:48:29.281+07	2021-03-27 14:48:29.281+07	\N	24	\N	\N
1745	MOBILE	2021-03-27 14:48:29.549+07	2021-03-27 14:48:29.549+07	1	24	\N	\N
1746	MOBILE	2021-03-27 14:49:08.111+07	2021-03-27 14:49:08.111+07	\N	24	\N	\N
1747	MOBILE	2021-03-27 14:49:08.598+07	2021-03-27 14:49:08.598+07	1	24	\N	\N
1748	MOBILE	2021-03-27 14:49:12.07+07	2021-03-27 14:49:12.07+07	2	24	\N	\N
1749	MOBILE	2021-03-27 14:49:36.239+07	2021-03-27 14:49:36.239+07	\N	24	\N	\N
1750	MOBILE	2021-03-27 14:49:36.51+07	2021-03-27 14:49:36.51+07	2	24	\N	\N
1751	MOBILE	2021-03-27 14:50:14.378+07	2021-03-27 14:50:14.378+07	\N	24	\N	\N
1752	MOBILE	2021-03-27 14:50:14.667+07	2021-03-27 14:50:14.667+07	2	24	\N	\N
1753	MOBILE	2021-03-27 14:51:29.664+07	2021-03-27 14:51:29.664+07	\N	24	\N	\N
1754	MOBILE	2021-03-27 14:51:29.948+07	2021-03-27 14:51:29.948+07	2	24	\N	\N
1755	MOBILE	2021-03-27 14:51:41.026+07	2021-03-27 14:51:41.026+07	\N	24	\N	\N
1756	MOBILE	2021-03-27 14:51:41.333+07	2021-03-27 14:51:41.333+07	2	24	\N	\N
1757	MOBILE	2021-03-27 14:52:17.567+07	2021-03-27 14:52:17.567+07	\N	24	\N	\N
1758	MOBILE	2021-03-27 14:52:17.793+07	2021-03-27 14:52:17.793+07	2	24	\N	\N
1759	MOBILE	2021-03-27 14:52:48.911+07	2021-03-27 14:52:48.911+07	\N	24	\N	\N
1760	MOBILE	2021-03-27 14:52:49.242+07	2021-03-27 14:52:49.242+07	2	24	\N	\N
1761	MOBILE	2021-03-27 14:53:05.009+07	2021-03-27 14:53:05.009+07	1	24	\N	\N
1762	MOBILE	2021-03-27 14:53:11.557+07	2021-03-27 14:53:11.557+07	\N	24	\N	\N
1763	MOBILE	2021-03-27 14:53:11.769+07	2021-03-27 14:53:11.769+07	1	24	\N	\N
1764	MOBILE	2021-03-27 14:55:04.145+07	2021-03-27 14:55:04.145+07	\N	24	\N	\N
1765	MOBILE	2021-03-27 14:55:04.399+07	2021-03-27 14:55:04.399+07	1	24	\N	\N
1766	MOBILE	2021-03-27 14:55:33.16+07	2021-03-27 14:55:33.16+07	\N	24	\N	\N
1767	MOBILE	2021-03-27 14:55:33.345+07	2021-03-27 14:55:33.345+07	1	24	\N	\N
1768	MOBILE	2021-03-27 14:56:24.293+07	2021-03-27 14:56:24.293+07	\N	24	\N	\N
1769	MOBILE	2021-03-27 14:56:24.481+07	2021-03-27 14:56:24.481+07	1	24	\N	\N
1770	MOBILE	2021-03-27 14:56:30.949+07	2021-03-27 14:56:30.949+07	\N	24	\N	\N
1771	MOBILE	2021-03-27 14:56:31.109+07	2021-03-27 14:56:31.109+07	1	24	\N	\N
1772	MOBILE	2021-03-27 14:56:35.449+07	2021-03-27 14:56:35.449+07	\N	24	\N	\N
1773	MOBILE	2021-03-27 14:56:35.563+07	2021-03-27 14:56:35.563+07	1	24	\N	\N
1774	MOBILE	2021-03-27 14:56:49.403+07	2021-03-27 14:56:49.403+07	\N	24	\N	\N
1775	MOBILE	2021-03-27 14:56:49.629+07	2021-03-27 14:56:49.629+07	1	24	\N	\N
1776	MOBILE	2021-03-27 14:57:00.944+07	2021-03-27 14:57:00.944+07	2	24	\N	\N
1777	MOBILE	2021-03-27 14:58:50.12+07	2021-03-27 14:58:50.12+07	\N	24	\N	\N
1778	MOBILE	2021-03-27 14:58:50.841+07	2021-03-27 14:58:50.841+07	2	24	\N	\N
1779	MOBILE	2021-03-27 15:02:26.548+07	2021-03-27 15:02:26.548+07	\N	24	\N	\N
1780	MOBILE	2021-03-27 15:02:26.687+07	2021-03-27 15:02:26.687+07	2	24	\N	\N
1781	MOBILE	2021-03-27 15:05:08.042+07	2021-03-27 15:05:08.042+07	\N	24	\N	\N
1782	MOBILE	2021-03-27 15:05:08.264+07	2021-03-27 15:05:08.264+07	2	24	\N	\N
1783	BROWSER	2021-03-27 15:05:24.556+07	2021-03-27 15:05:24.556+07	\N	24	\N	\N
1784	BROWSER	2021-03-27 15:05:24.708+07	2021-03-27 15:05:24.708+07	2	24	\N	\N
1785	BROWSER	2021-03-27 15:05:31.613+07	2021-03-27 15:05:31.613+07	\N	24	\N	\N
1786	BROWSER	2021-03-27 15:05:31.767+07	2021-03-27 15:05:31.767+07	2	24	\N	\N
1787	BROWSER	2021-03-27 15:05:44.279+07	2021-03-27 15:05:44.279+07	\N	24	\N	\N
1788	BROWSER	2021-03-27 15:05:44.382+07	2021-03-27 15:05:44.382+07	2	24	\N	\N
1789	BROWSER	2021-03-27 15:08:35.225+07	2021-03-27 15:08:35.225+07	\N	24	\N	\N
1790	BROWSER	2021-03-27 15:08:35.346+07	2021-03-27 15:08:35.346+07	2	24	\N	\N
1791	BROWSER	2021-03-27 15:08:42.792+07	2021-03-27 15:08:42.792+07	\N	24	\N	\N
1792	BROWSER	2021-03-27 15:08:42.935+07	2021-03-27 15:08:42.935+07	2	24	\N	\N
1793	BROWSER	2021-03-27 15:09:05.507+07	2021-03-27 15:09:05.507+07	\N	24	\N	\N
1794	BROWSER	2021-03-27 15:09:05.825+07	2021-03-27 15:09:05.825+07	2	24	\N	\N
1795	BROWSER	2021-03-27 15:09:59.84+07	2021-03-27 15:09:59.84+07	\N	24	\N	\N
1796	BROWSER	2021-03-27 15:10:00.09+07	2021-03-27 15:10:00.09+07	2	24	\N	\N
1797	BROWSER	2021-03-27 15:10:27.938+07	2021-03-27 15:10:27.938+07	\N	24	\N	\N
1798	BROWSER	2021-03-27 15:10:29.269+07	2021-03-27 15:10:29.269+07	\N	24	\N	\N
1799	BROWSER	2021-03-27 15:10:29.437+07	2021-03-27 15:10:29.437+07	2	24	\N	\N
1800	BROWSER	2021-03-27 15:12:20.1+07	2021-03-27 15:12:20.1+07	\N	24	\N	\N
1801	BROWSER	2021-03-27 15:12:20.229+07	2021-03-27 15:12:20.229+07	2	24	\N	\N
1802	BROWSER	2021-03-27 15:12:58.223+07	2021-03-27 15:12:58.223+07	\N	24	\N	\N
1803	BROWSER	2021-03-27 15:12:58.637+07	2021-03-27 15:12:58.637+07	2	24	\N	\N
1804	BROWSER	2021-03-27 15:13:27.522+07	2021-03-27 15:13:27.522+07	\N	24	\N	\N
1805	BROWSER	2021-03-27 15:13:27.726+07	2021-03-27 15:13:27.726+07	2	24	\N	\N
1806	BROWSER	2021-03-27 15:14:26.079+07	2021-03-27 15:14:26.079+07	\N	24	\N	\N
1807	BROWSER	2021-03-27 15:14:26.27+07	2021-03-27 15:14:26.27+07	2	24	\N	\N
1808	BROWSER	2021-03-27 15:14:42.609+07	2021-03-27 15:14:42.609+07	\N	24	\N	\N
1809	BROWSER	2021-03-27 15:14:42.713+07	2021-03-27 15:14:42.713+07	2	24	\N	\N
1810	BROWSER	2021-03-27 15:14:53.477+07	2021-03-27 15:14:53.477+07	\N	24	\N	\N
1811	BROWSER	2021-03-27 15:14:53.602+07	2021-03-27 15:14:53.602+07	2	24	\N	\N
1812	BROWSER	2021-03-27 15:16:44.912+07	2021-03-27 15:16:44.912+07	\N	24	\N	\N
1813	BROWSER	2021-03-27 15:16:45.194+07	2021-03-27 15:16:45.194+07	2	24	\N	\N
1814	BROWSER	2021-03-27 15:17:04.543+07	2021-03-27 15:17:04.543+07	\N	24	\N	\N
1815	BROWSER	2021-03-27 15:17:04.725+07	2021-03-27 15:17:04.725+07	2	24	\N	\N
1816	BROWSER	2021-03-27 15:17:22.716+07	2021-03-27 15:17:22.716+07	\N	24	\N	\N
1817	BROWSER	2021-03-27 15:17:22.878+07	2021-03-27 15:17:22.878+07	2	24	\N	\N
1818	BROWSER	2021-03-27 15:17:55.296+07	2021-03-27 15:17:55.296+07	\N	24	\N	\N
1819	BROWSER	2021-03-27 15:17:55.489+07	2021-03-27 15:17:55.489+07	2	24	\N	\N
1820	BROWSER	2021-03-27 15:18:03.682+07	2021-03-27 15:18:03.682+07	\N	24	\N	\N
1821	BROWSER	2021-03-27 15:18:03.842+07	2021-03-27 15:18:03.842+07	2	24	\N	\N
1822	BROWSER	2021-03-27 15:18:47.056+07	2021-03-27 15:18:47.056+07	\N	24	\N	\N
1823	BROWSER	2021-03-27 15:18:47.194+07	2021-03-27 15:18:47.194+07	2	24	\N	\N
1824	BROWSER	2021-03-27 15:19:26.015+07	2021-03-27 15:19:26.015+07	\N	24	\N	\N
1825	BROWSER	2021-03-27 15:19:26.172+07	2021-03-27 15:19:26.172+07	2	24	\N	\N
1826	BROWSER	2021-03-27 15:19:36.606+07	2021-03-27 15:19:36.606+07	\N	24	\N	\N
1827	BROWSER	2021-03-27 15:19:36.752+07	2021-03-27 15:19:36.752+07	2	24	\N	\N
1828	BROWSER	2021-03-27 15:20:04.457+07	2021-03-27 15:20:04.457+07	\N	24	\N	\N
1829	BROWSER	2021-03-27 15:20:04.593+07	2021-03-27 15:20:04.593+07	2	24	\N	\N
1830	BROWSER	2021-03-27 15:21:21.508+07	2021-03-27 15:21:21.508+07	\N	24	\N	\N
1831	BROWSER	2021-03-27 15:21:21.586+07	2021-03-27 15:21:21.586+07	2	24	\N	\N
1832	BROWSER	2021-03-27 15:22:02.662+07	2021-03-27 15:22:02.662+07	\N	24	\N	\N
1833	BROWSER	2021-03-27 15:22:02.771+07	2021-03-27 15:22:02.771+07	2	24	\N	\N
1834	BROWSER	2021-03-27 15:22:52.786+07	2021-03-27 15:22:52.786+07	\N	24	\N	\N
1835	BROWSER	2021-03-27 15:22:53.005+07	2021-03-27 15:22:53.005+07	2	24	\N	\N
1836	BROWSER	2021-03-27 15:23:07.843+07	2021-03-27 15:23:07.843+07	\N	24	\N	\N
1837	BROWSER	2021-03-27 15:23:08.072+07	2021-03-27 15:23:08.072+07	2	24	\N	\N
1838	BROWSER	2021-03-27 15:23:34.182+07	2021-03-27 15:23:34.182+07	\N	24	\N	\N
1839	BROWSER	2021-03-27 15:23:34.354+07	2021-03-27 15:23:34.354+07	2	24	\N	\N
1840	BROWSER	2021-03-27 15:24:34.465+07	2021-03-27 15:24:34.465+07	\N	24	\N	\N
1841	BROWSER	2021-03-27 15:24:39.168+07	2021-03-27 15:24:39.168+07	2	24	\N	\N
1842	BROWSER	2021-03-27 15:24:59.01+07	2021-03-27 15:24:59.01+07	1	24	\N	\N
1843	BROWSER	2021-03-27 15:25:04.146+07	2021-03-27 15:25:04.146+07	\N	24	7	\N
1844	BROWSER	2021-03-27 15:26:39.259+07	2021-03-27 15:26:39.259+07	\N	24	\N	\N
1845	BROWSER	2021-03-27 15:26:39.419+07	2021-03-27 15:26:39.419+07	\N	24	7	\N
1846	BROWSER	2021-03-27 15:26:43.468+07	2021-03-27 15:26:43.468+07	19	24	\N	\N
1847	BROWSER	2021-03-27 15:27:38.166+07	2021-03-27 15:27:38.166+07	\N	24	\N	\N
1848	BROWSER	2021-03-27 15:27:38.272+07	2021-03-27 15:27:38.272+07	19	24	\N	\N
1849	BROWSER	2021-03-27 15:29:35.522+07	2021-03-27 15:29:35.522+07	\N	24	\N	\N
1850	BROWSER	2021-03-27 15:29:35.62+07	2021-03-27 15:29:35.62+07	19	24	\N	\N
1851	BROWSER	2021-03-27 15:29:51.447+07	2021-03-27 15:29:51.447+07	1	24	\N	\N
1852	BROWSER	2021-03-27 15:29:53.072+07	2021-03-27 15:29:53.072+07	2	24	\N	\N
1853	BROWSER	2021-03-27 15:30:06.877+07	2021-03-27 15:30:06.877+07	\N	24	\N	\N
1854	BROWSER	2021-03-27 15:30:06.999+07	2021-03-27 15:30:06.999+07	2	24	\N	\N
1855	BROWSER	2021-03-27 15:30:23.099+07	2021-03-27 15:30:23.099+07	\N	24	\N	\N
1856	BROWSER	2021-03-27 15:30:23.219+07	2021-03-27 15:30:23.219+07	2	24	\N	\N
1857	BROWSER	2021-03-27 15:30:39.393+07	2021-03-27 15:30:39.393+07	\N	24	\N	\N
1858	BROWSER	2021-03-27 15:30:39.562+07	2021-03-27 15:30:39.562+07	2	24	\N	\N
1859	BROWSER	2021-03-27 15:34:59.278+07	2021-03-27 15:34:59.278+07	\N	24	\N	\N
1860	BROWSER	2021-03-27 15:34:59.411+07	2021-03-27 15:34:59.411+07	2	24	\N	\N
1861	BROWSER	2021-03-27 15:37:17.218+07	2021-03-27 15:37:17.218+07	1	24	\N	\N
1862	BROWSER	2021-03-27 15:37:47.593+07	2021-03-27 15:37:47.593+07	2	24	\N	\N
1863	BROWSER	2021-03-27 15:38:04.953+07	2021-03-27 15:38:04.953+07	\N	2	\N	\N
1864	BROWSER	2021-03-27 15:40:09.727+07	2021-03-27 15:40:09.727+07	\N	2	\N	\N
1865	BROWSER	2021-03-27 15:40:09.741+07	2021-03-27 15:40:09.741+07	\N	24	\N	\N
1866	BROWSER	2021-03-27 15:41:03.572+07	2021-03-27 15:41:03.572+07	\N	24	\N	\N
1867	BROWSER	2021-03-27 15:41:04.182+07	2021-03-27 15:41:04.182+07	\N	2	\N	\N
1868	BROWSER	2021-03-27 15:42:04.319+07	2021-03-27 15:42:04.319+07	\N	2	\N	\N
1869	BROWSER	2021-03-27 15:42:09.735+07	2021-03-27 15:42:09.735+07	2	2	\N	\N
1870	BROWSER	2021-03-27 15:42:25.895+07	2021-03-27 15:42:25.895+07	\N	2	\N	\N
1871	BROWSER	2021-03-27 15:42:25.994+07	2021-03-27 15:42:25.994+07	2	2	\N	\N
1872	BROWSER	2021-03-27 15:42:53.709+07	2021-03-27 15:42:53.709+07	\N	2	\N	\N
1873	BROWSER	2021-03-27 15:42:53.869+07	2021-03-27 15:42:53.869+07	2	2	\N	\N
1874	BROWSER	2021-03-27 15:42:55.09+07	2021-03-27 15:42:55.09+07	\N	24	\N	\N
1875	BROWSER	2021-03-27 15:45:06.153+07	2021-03-27 15:45:06.153+07	\N	24	\N	\N
1876	MOBILE	2021-03-27 15:45:21.326+07	2021-03-27 15:45:21.326+07	\N	24	\N	\N
1877	MOBILE	2021-03-27 15:45:25.495+07	2021-03-27 15:45:25.495+07	2	24	\N	\N
1878	MOBILE	2021-03-27 15:46:57.155+07	2021-03-27 15:46:57.155+07	\N	24	\N	\N
1879	MOBILE	2021-03-27 15:46:57.309+07	2021-03-27 15:46:57.309+07	2	24	\N	\N
1880	MOBILE	2021-03-27 15:47:26.766+07	2021-03-27 15:47:26.766+07	\N	24	\N	\N
1881	MOBILE	2021-03-27 15:47:26.984+07	2021-03-27 15:47:26.984+07	2	24	\N	\N
1882	MOBILE	2021-03-27 15:48:04.23+07	2021-03-27 15:48:04.23+07	\N	24	\N	\N
1883	MOBILE	2021-03-27 15:48:04.445+07	2021-03-27 15:48:04.445+07	2	24	\N	\N
1884	MOBILE	2021-03-27 15:48:36.595+07	2021-03-27 15:48:36.595+07	\N	24	\N	\N
1885	MOBILE	2021-03-27 15:48:36.842+07	2021-03-27 15:48:36.842+07	2	24	\N	\N
1886	MOBILE	2021-03-27 15:49:26.88+07	2021-03-27 15:49:26.88+07	\N	24	\N	\N
1887	MOBILE	2021-03-27 15:49:27.01+07	2021-03-27 15:49:27.01+07	2	24	\N	\N
1888	MOBILE	2021-03-27 15:49:40.807+07	2021-03-27 15:49:40.807+07	\N	24	\N	\N
1889	MOBILE	2021-03-27 15:49:40.911+07	2021-03-27 15:49:40.911+07	2	24	\N	\N
1890	MOBILE	2021-03-27 15:49:58.346+07	2021-03-27 15:49:58.346+07	\N	24	\N	\N
1891	MOBILE	2021-03-27 15:49:58.532+07	2021-03-27 15:49:58.532+07	2	24	\N	\N
1892	MOBILE	2021-03-27 15:52:16.911+07	2021-03-27 15:52:16.911+07	\N	24	\N	\N
1893	MOBILE	2021-03-27 15:52:17.063+07	2021-03-27 15:52:17.063+07	2	24	\N	\N
1894	MOBILE	2021-03-27 15:52:44.602+07	2021-03-27 15:52:44.602+07	\N	24	\N	\N
1895	MOBILE	2021-03-27 15:52:44.879+07	2021-03-27 15:52:44.879+07	2	24	\N	\N
1896	BROWSER	2021-03-27 15:53:13.114+07	2021-03-27 15:53:13.114+07	\N	24	\N	\N
1897	BROWSER	2021-03-27 15:53:13.339+07	2021-03-27 15:53:13.339+07	2	24	\N	\N
1898	MOBILE	2021-03-27 15:53:28.809+07	2021-03-27 15:53:28.809+07	\N	24	\N	\N
1899	MOBILE	2021-03-27 15:53:28.989+07	2021-03-27 15:53:28.989+07	2	24	\N	\N
1900	MOBILE	2021-03-27 15:54:04.757+07	2021-03-27 15:54:04.757+07	\N	24	\N	\N
1901	MOBILE	2021-03-27 15:54:05.102+07	2021-03-27 15:54:05.102+07	2	24	\N	\N
1902	MOBILE	2021-03-27 15:54:22.258+07	2021-03-27 15:54:22.258+07	\N	24	\N	\N
1903	MOBILE	2021-03-27 15:54:22.482+07	2021-03-27 15:54:22.482+07	2	24	\N	\N
1904	BROWSER	2021-03-28 11:48:41.436+07	2021-03-28 11:48:41.436+07	\N	24	\N	\N
1905	MOBILE	2021-03-28 11:48:54.944+07	2021-03-28 11:48:54.944+07	\N	24	\N	\N
1906	MOBILE	2021-03-28 11:49:42.274+07	2021-03-28 11:49:42.274+07	\N	24	\N	\N
1907	MOBILE	2021-03-28 11:49:51.606+07	2021-03-28 11:49:51.606+07	\N	24	\N	\N
1908	BROWSER	2021-03-28 22:43:53.783+07	2021-03-28 22:43:53.783+07	\N	24	\N	\N
1909	BROWSER	2021-03-28 22:47:12.501+07	2021-03-28 22:47:12.501+07	\N	24	\N	\N
1910	BROWSER	2021-03-28 22:47:42.129+07	2021-03-28 22:47:42.129+07	\N	24	\N	\N
1911	BROWSER	2021-03-28 22:48:12.046+07	2021-03-28 22:48:12.046+07	\N	24	\N	\N
1912	BROWSER	2021-03-28 22:49:00.623+07	2021-03-28 22:49:00.623+07	\N	24	\N	\N
1913	BROWSER	2021-03-28 22:49:55.261+07	2021-03-28 22:49:55.261+07	\N	24	\N	\N
1914	BROWSER	2021-03-28 22:50:38.737+07	2021-03-28 22:50:38.737+07	\N	24	\N	\N
1915	BROWSER	2021-03-28 22:51:00.76+07	2021-03-28 22:51:00.76+07	\N	24	\N	\N
1916	BROWSER	2021-03-28 22:51:15.684+07	2021-03-28 22:51:15.684+07	\N	24	\N	\N
1917	BROWSER	2021-03-28 22:51:21.277+07	2021-03-28 22:51:21.277+07	\N	24	\N	\N
1918	BROWSER	2021-03-28 22:51:48.794+07	2021-03-28 22:51:48.794+07	\N	24	\N	\N
1919	BROWSER	2021-03-28 22:51:59.093+07	2021-03-28 22:51:59.093+07	\N	24	\N	\N
1920	BROWSER	2021-03-28 22:54:19.281+07	2021-03-28 22:54:19.281+07	\N	24	\N	\N
1921	BROWSER	2021-03-28 22:54:32.488+07	2021-03-28 22:54:32.488+07	\N	24	\N	\N
1922	BROWSER	2021-03-28 22:54:37.105+07	2021-03-28 22:54:37.105+07	\N	24	\N	\N
1923	BROWSER	2021-03-28 23:00:35.613+07	2021-03-28 23:00:35.613+07	\N	24	\N	\N
1924	BROWSER	2021-03-28 23:00:40.936+07	2021-03-28 23:00:40.936+07	2	24	\N	\N
1925	BROWSER	2021-03-28 23:02:21.45+07	2021-03-28 23:02:21.45+07	\N	24	\N	\N
1926	BROWSER	2021-03-28 23:02:21.561+07	2021-03-28 23:02:21.561+07	2	24	\N	\N
1927	MOBILE	2021-03-28 23:04:16.155+07	2021-03-28 23:04:16.155+07	\N	24	\N	\N
1928	MOBILE	2021-03-28 23:04:16.284+07	2021-03-28 23:04:16.284+07	2	24	\N	\N
1929	BROWSER	2021-03-28 23:04:29.608+07	2021-03-28 23:04:29.608+07	\N	24	\N	\N
1930	BROWSER	2021-03-28 23:04:29.772+07	2021-03-28 23:04:29.772+07	2	24	\N	\N
1931	BROWSER	2021-03-28 23:07:42.827+07	2021-03-28 23:07:42.827+07	\N	24	\N	\N
1932	BROWSER	2021-03-28 23:07:45.951+07	2021-03-28 23:07:45.951+07	2	24	\N	\N
1933	BROWSER	2021-03-28 23:08:04.672+07	2021-03-28 23:08:04.672+07	\N	24	\N	\N
1934	BROWSER	2021-03-28 23:08:05.72+07	2021-03-28 23:08:05.72+07	2	24	\N	\N
1935	BROWSER	2021-03-28 23:08:22.669+07	2021-03-28 23:08:22.669+07	\N	24	\N	\N
1936	BROWSER	2021-03-28 23:08:22.821+07	2021-03-28 23:08:22.821+07	2	24	\N	\N
1937	BROWSER	2021-03-28 23:08:30.959+07	2021-03-28 23:08:30.959+07	2	24	\N	\N
1938	BROWSER	2021-03-28 23:10:03.045+07	2021-03-28 23:10:03.045+07	\N	24	\N	\N
1939	BROWSER	2021-03-28 23:10:03.162+07	2021-03-28 23:10:03.162+07	2	24	\N	\N
1940	BROWSER	2021-03-28 23:10:23.845+07	2021-03-28 23:10:23.845+07	\N	2	\N	\N
1941	BROWSER	2021-03-28 23:10:43.559+07	2021-03-28 23:10:43.559+07	\N	2	\N	\N
1942	BROWSER	2021-03-28 23:12:01.894+07	2021-03-28 23:12:01.894+07	2	2	\N	\N
1943	BROWSER	2021-03-28 23:12:28.548+07	2021-03-28 23:12:28.548+07	\N	2	\N	\N
1944	BROWSER	2021-03-28 23:12:36.72+07	2021-03-28 23:12:36.72+07	2	2	\N	\N
1945	BROWSER	2021-03-28 23:14:23.98+07	2021-03-28 23:14:23.98+07	\N	2	\N	\N
1946	BROWSER	2021-03-28 23:15:03.396+07	2021-03-28 23:15:03.396+07	\N	2	\N	\N
1947	BROWSER	2021-03-28 23:15:03.593+07	2021-03-28 23:15:03.593+07	2	2	\N	\N
1948	BROWSER	2021-04-26 19:27:46.126+07	2021-04-26 19:27:46.126+07	\N	2	\N	\N
1949	BROWSER	2021-04-26 19:39:17.031+07	2021-04-26 19:39:17.031+07	\N	2	\N	\N
1950	BROWSER	2021-04-26 19:39:41.623+07	2021-04-26 19:39:41.623+07	\N	2	\N	\N
1951	BROWSER	2021-04-26 19:40:09.429+07	2021-04-26 19:40:09.429+07	\N	2	\N	\N
1952	BROWSER	2021-04-26 19:42:05.774+07	2021-04-26 19:42:05.774+07	\N	2	\N	\N
1953	BROWSER	2021-04-26 19:42:23.273+07	2021-04-26 19:42:23.273+07	\N	2	\N	\N
1954	BROWSER	2021-04-26 19:42:41.56+07	2021-04-26 19:42:41.56+07	\N	2	\N	\N
1955	BROWSER	2021-04-26 19:45:47.491+07	2021-04-26 19:45:47.491+07	\N	2	\N	\N
1956	BROWSER	2021-04-26 19:46:04.597+07	2021-04-26 19:46:04.597+07	\N	2	\N	\N
1957	BROWSER	2021-04-26 19:46:10.09+07	2021-04-26 19:46:10.09+07	\N	2	\N	\N
1958	BROWSER	2021-04-26 19:46:21.379+07	2021-04-26 19:46:21.379+07	\N	2	\N	\N
1959	BROWSER	2021-04-26 19:50:58.375+07	2021-04-26 19:50:58.375+07	\N	2	\N	\N
1960	BROWSER	2021-04-26 19:51:07.072+07	2021-04-26 19:51:07.072+07	\N	2	\N	\N
1961	BROWSER	2021-04-26 19:51:27.159+07	2021-04-26 19:51:27.159+07	\N	2	\N	\N
1962	BROWSER	2021-04-26 19:52:30.582+07	2021-04-26 19:52:30.582+07	\N	2	\N	\N
1963	BROWSER	2021-04-26 19:58:59.775+07	2021-04-26 19:58:59.775+07	\N	2	\N	\N
1964	BROWSER	2021-04-26 19:59:15.668+07	2021-04-26 19:59:15.668+07	\N	2	\N	\N
1965	BROWSER	2021-04-26 19:59:55.526+07	2021-04-26 19:59:55.526+07	\N	2	\N	\N
1966	BROWSER	2021-04-26 20:00:07.7+07	2021-04-26 20:00:07.7+07	\N	2	\N	\N
1967	BROWSER	2021-04-26 20:00:12.599+07	2021-04-26 20:00:12.599+07	\N	2	\N	\N
1968	BROWSER	2021-04-26 20:00:16.537+07	2021-04-26 20:00:16.537+07	\N	2	\N	\N
1969	BROWSER	2021-04-26 20:00:23.579+07	2021-04-26 20:00:23.579+07	\N	2	\N	\N
1970	BROWSER	2021-04-26 20:09:15.921+07	2021-04-26 20:09:15.921+07	\N	2	\N	\N
1971	BROWSER	2021-04-26 20:09:22.865+07	2021-04-26 20:09:22.865+07	\N	2	\N	\N
1972	BROWSER	2021-04-26 20:13:47.193+07	2021-04-26 20:13:47.193+07	\N	2	7	\N
1973	BROWSER	2021-04-26 20:13:56.583+07	2021-04-26 20:13:56.583+07	\N	2	6	\N
1974	BROWSER	2021-04-26 20:14:02.309+07	2021-04-26 20:14:02.309+07	\N	2	5	\N
1975	BROWSER	2021-04-26 20:14:41.062+07	2021-04-26 20:14:41.062+07	\N	2	6	\N
1976	BROWSER	2021-04-26 20:14:46.944+07	2021-04-26 20:14:46.944+07	\N	2	7	\N
1977	BROWSER	2021-04-26 20:14:57.448+07	2021-04-26 20:14:57.448+07	\N	2	5	\N
1978	BROWSER	2021-04-26 20:20:36.538+07	2021-04-26 20:20:36.538+07	\N	2	\N	\N
1979	BROWSER	2021-04-26 20:32:34.169+07	2021-04-26 20:32:34.169+07	\N	2	6	\N
1980	BROWSER	2021-04-26 20:32:47.757+07	2021-04-26 20:32:47.757+07	\N	2	\N	\N
1981	BROWSER	2021-04-26 20:33:00.126+07	2021-04-26 20:33:00.126+07	\N	32	\N	\N
1982	BROWSER	2021-04-26 20:58:06.268+07	2021-04-26 20:58:06.268+07	\N	32	\N	\N
1983	BROWSER	2021-04-26 20:58:42.611+07	2021-04-26 20:58:42.611+07	\N	32	\N	\N
1984	BROWSER	2021-04-26 20:59:15.822+07	2021-04-26 20:59:15.822+07	\N	32	\N	\N
1985	BROWSER	2021-04-26 21:03:06.88+07	2021-04-26 21:03:06.88+07	\N	32	6	\N
1986	BROWSER	2021-04-26 21:03:34.416+07	2021-04-26 21:03:34.416+07	\N	33	\N	\N
1987	BROWSER	2021-04-26 21:14:16.181+07	2021-04-26 21:14:16.181+07	\N	33	\N	\N
1988	BROWSER	2021-04-26 21:17:36.147+07	2021-04-26 21:17:36.147+07	\N	33	\N	\N
1989	BROWSER	2021-04-26 21:17:51.924+07	2021-04-26 21:17:51.924+07	\N	33	\N	\N
1990	BROWSER	2021-04-26 21:18:08.735+07	2021-04-26 21:18:08.735+07	\N	33	\N	\N
1991	BROWSER	2021-04-26 21:18:20.329+07	2021-04-26 21:18:20.329+07	\N	33	\N	\N
1992	BROWSER	2021-04-26 21:18:33.244+07	2021-04-26 21:18:33.244+07	\N	34	\N	\N
1993	BROWSER	2021-04-26 21:19:37.876+07	2021-04-26 21:19:37.876+07	\N	33	\N	\N
1994	BROWSER	2021-04-26 21:21:03.925+07	2021-04-26 21:21:03.925+07	\N	32	\N	\N
1995	BROWSER	2021-04-26 21:21:32.056+07	2021-04-26 21:21:32.056+07	\N	34	\N	\N
1996	BROWSER	2021-04-26 21:25:49.407+07	2021-04-26 21:25:49.407+07	\N	35	\N	\N
1997	BROWSER	2021-04-26 21:32:04.528+07	2021-04-26 21:32:04.528+07	\N	36	\N	\N
1998	BROWSER	2021-04-26 21:35:33.843+07	2021-04-26 21:35:33.843+07	\N	36	\N	\N
1999	BROWSER	2021-04-26 21:36:31.812+07	2021-04-26 21:36:31.812+07	\N	37	\N	\N
2000	BROWSER	2021-04-26 21:40:23.388+07	2021-04-26 21:40:23.388+07	\N	37	\N	\N
2001	BROWSER	2021-04-26 21:40:31.802+07	2021-04-26 21:40:31.802+07	\N	38	\N	\N
2002	BROWSER	2021-04-26 21:43:39.078+07	2021-04-26 21:43:39.078+07	\N	39	\N	\N
2003	BROWSER	2021-04-26 21:47:09.723+07	2021-04-26 21:47:09.723+07	\N	40	\N	\N
2004	BROWSER	2021-04-26 21:50:48.101+07	2021-04-26 21:50:48.101+07	\N	41	\N	\N
2005	BROWSER	2021-04-26 21:54:05.212+07	2021-04-26 21:54:05.212+07	\N	41	6	\N
2006	BROWSER	2021-04-26 21:54:48.411+07	2021-04-26 21:54:48.411+07	\N	41	\N	\N
2007	BROWSER	2021-04-26 21:54:48.618+07	2021-04-26 21:54:48.618+07	\N	41	6	\N
2008	BROWSER	2021-04-26 21:55:31.628+07	2021-04-26 21:55:31.628+07	\N	2	\N	\N
2009	BROWSER	2021-04-26 22:01:59.48+07	2021-04-26 22:01:59.48+07	\N	2	\N	\N
2010	BROWSER	2021-04-26 22:02:44.808+07	2021-04-26 22:02:44.808+07	\N	2	6	\N
2011	BROWSER	2021-04-26 22:12:31.454+07	2021-04-26 22:12:31.454+07	\N	2	\N	\N
2012	BROWSER	2021-04-26 22:12:39.205+07	2021-04-26 22:12:39.205+07	\N	2	\N	\N
2013	BROWSER	2021-04-26 22:12:43.19+07	2021-04-26 22:12:43.19+07	\N	2	\N	\N
2014	BROWSER	2021-04-26 22:12:47.397+07	2021-04-26 22:12:47.397+07	\N	2	\N	\N
2015	BROWSER	2021-04-26 22:12:59.347+07	2021-04-26 22:12:59.347+07	\N	2	\N	\N
2016	BROWSER	2021-04-26 22:14:12.047+07	2021-04-26 22:14:12.047+07	\N	2	\N	\N
2017	BROWSER	2021-04-26 22:17:30.621+07	2021-04-26 22:17:30.621+07	\N	2	\N	\N
2018	BROWSER	2021-04-26 22:22:57.064+07	2021-04-26 22:22:57.064+07	\N	2	\N	\N
2019	BROWSER	2021-04-26 22:23:02.797+07	2021-04-26 22:23:02.797+07	\N	2	6	\N
2020	BROWSER	2021-04-26 22:27:30.827+07	2021-04-26 22:27:30.827+07	\N	2	\N	1
2021	BROWSER	2021-04-26 22:27:58.857+07	2021-04-26 22:27:58.857+07	\N	2	\N	1
2022	BROWSER	2021-04-26 22:29:43.112+07	2021-04-26 22:29:43.112+07	2	2	\N	\N
2023	BROWSER	2021-04-26 22:30:07.969+07	2021-04-26 22:30:07.969+07	\N	2	6	\N
2024	BROWSER	2021-04-26 22:30:29.087+07	2021-04-26 22:30:29.087+07	24	2	\N	\N
2025	BROWSER	2021-04-26 22:30:36.401+07	2021-04-26 22:30:36.401+07	\N	2	6	\N
2026	BROWSER	2021-04-26 22:30:42.71+07	2021-04-26 22:30:42.71+07	25	2	\N	\N
2027	BROWSER	2021-04-26 22:30:57.714+07	2021-04-26 22:30:57.714+07	\N	2	6	\N
2028	BROWSER	2021-04-26 22:31:18.296+07	2021-04-26 22:31:18.296+07	26	2	\N	\N
2029	BROWSER	2021-04-26 22:34:19.204+07	2021-04-26 22:34:19.204+07	1	2	\N	\N
2030	BROWSER	2021-04-26 22:37:31.754+07	2021-04-26 22:37:31.754+07	\N	2	6	\N
2031	BROWSER	2021-04-26 22:37:43.851+07	2021-04-26 22:37:43.851+07	25	2	\N	\N
2032	BROWSER	2021-04-26 22:38:08.932+07	2021-04-26 22:38:08.932+07	\N	2	\N	\N
2033	BROWSER	2021-04-26 22:38:09.075+07	2021-04-26 22:38:09.075+07	25	2	\N	\N
2034	BROWSER	2021-04-26 22:47:10.836+07	2021-04-26 22:47:10.836+07	\N	32	\N	\N
2035	BROWSER	2021-04-27 20:13:53.358+07	2021-04-27 20:13:53.358+07	\N	2	\N	\N
2036	BROWSER	2021-04-27 20:19:16.726+07	2021-04-27 20:19:16.726+07	\N	2	\N	\N
2037	BROWSER	2021-04-27 20:23:25.369+07	2021-04-27 20:23:25.369+07	\N	2	\N	\N
2038	BROWSER	2021-04-27 20:25:20.119+07	2021-04-27 20:25:20.119+07	\N	2	\N	\N
2039	BROWSER	2021-04-27 23:42:47.525+07	2021-04-27 23:42:47.525+07	\N	2	\N	\N
2040	BROWSER	2021-04-28 20:44:59.535+07	2021-04-28 20:44:59.535+07	\N	2	\N	\N
\.


--
-- Name: assets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assets_id_seq', 197, true);


--
-- Name: boothResources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."boothResources_id_seq"', 1, false);


--
-- Name: booths_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.booths_id_seq', 33, true);


--
-- Name: chatConversations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."chatConversations_id_seq"', 40, true);


--
-- Name: chatMessages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."chatMessages_id_seq"', 152, true);


--
-- Name: collectors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collectors_id_seq', 18, true);


--
-- Name: halls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.halls_id_seq', 8, true);


--
-- Name: landings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.landings_id_seq', 1, false);


--
-- Name: lobbies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lobbies_id_seq', 1, false);


--
-- Name: organizers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizers_id_seq', 1, false);


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_id_seq', 70, true);


--
-- Name: resourceHubs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."resourceHubs_id_seq"', 23, true);


--
-- Name: rolePermissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."rolePermissions_id_seq"', 175, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 15, true);


--
-- Name: routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.routes_id_seq', 1, false);


--
-- Name: sceneAssets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."sceneAssets_id_seq"', 4, true);


--
-- Name: sceneAssets_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."sceneAssets_id_seq1"', 210, true);


--
-- Name: sceneModels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."sceneModels_id_seq"', 139, true);


--
-- Name: sceneTemplates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."sceneTemplates_id_seq"', 1, false);


--
-- Name: stages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stages_id_seq', 1, true);


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 19, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 41, true);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.visits_id_seq', 2040, true);


--
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);


--
-- Name: boothResources boothResources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."boothResources"
    ADD CONSTRAINT "boothResources_pkey" PRIMARY KEY (id);


--
-- Name: booths booths_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booths
    ADD CONSTRAINT booths_pkey PRIMARY KEY (id);


--
-- Name: chatConversations chatConversations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chatConversations"
    ADD CONSTRAINT "chatConversations_pkey" PRIMARY KEY (id);


--
-- Name: chatMessages chatMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chatMessages"
    ADD CONSTRAINT "chatMessages_pkey" PRIMARY KEY (id);


--
-- Name: collectors collectors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collectors
    ADD CONSTRAINT collectors_pkey PRIMARY KEY (id);


--
-- Name: halls halls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.halls
    ADD CONSTRAINT halls_pkey PRIMARY KEY (id);


--
-- Name: landings landings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landings
    ADD CONSTRAINT landings_pkey PRIMARY KEY (id);


--
-- Name: lobbies lobbies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lobbies
    ADD CONSTRAINT lobbies_pkey PRIMARY KEY (id);


--
-- Name: organizers organizers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizers
    ADD CONSTRAINT organizers_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: resourceHubs resourceHubs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."resourceHubs"
    ADD CONSTRAINT "resourceHubs_pkey" PRIMARY KEY (id);


--
-- Name: rolePermissions rolePermissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."rolePermissions"
    ADD CONSTRAINT "rolePermissions_pkey" PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (id);


--
-- Name: sceneAssets sceneAssets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneAssets"
    ADD CONSTRAINT "sceneAssets_pkey" PRIMARY KEY (id);


--
-- Name: sceneModels sceneModels_lobbyId_hallId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneModels"
    ADD CONSTRAINT "sceneModels_lobbyId_hallId_key" UNIQUE ("lobbyId", "hallId");


--
-- Name: sceneModels sceneModels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneModels"
    ADD CONSTRAINT "sceneModels_pkey" PRIMARY KEY (id);


--
-- Name: sceneTemplates sceneTemplates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneTemplates"
    ADD CONSTRAINT "sceneTemplates_pkey" PRIMARY KEY (id);


--
-- Name: stages stages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stages
    ADD CONSTRAINT stages_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: assets assets_boothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT "assets_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES public.booths(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: boothResources boothResources_boothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."boothResources"
    ADD CONSTRAINT "boothResources_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES public.booths(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: chatConversations chatConversations_boothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chatConversations"
    ADD CONSTRAINT "chatConversations_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES public.booths(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: chatConversations chatConversations_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chatConversations"
    ADD CONSTRAINT "chatConversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: chatMessages chatMessages_chatConversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chatMessages"
    ADD CONSTRAINT "chatMessages_chatConversationId_fkey" FOREIGN KEY ("chatConversationId") REFERENCES public."chatConversations"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: chatMessages chatMessages_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chatMessages"
    ADD CONSTRAINT "chatMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: collectors collectors_boothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collectors
    ADD CONSTRAINT "collectors_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES public.booths(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: collectors collectors_hallId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collectors
    ADD CONSTRAINT "collectors_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES public.halls(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: collectors collectors_stageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collectors
    ADD CONSTRAINT "collectors_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES public.stages(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: collectors collectors_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collectors
    ADD CONSTRAINT "collectors_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: halls halls_lobbyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.halls
    ADD CONSTRAINT "halls_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES public.lobbies(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: halls halls_sceneTemplateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.halls
    ADD CONSTRAINT "halls_sceneTemplateId_fkey" FOREIGN KEY ("sceneTemplateId") REFERENCES public."sceneTemplates"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: organizers organizers_boothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizers
    ADD CONSTRAINT "organizers_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES public.booths(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: organizers organizers_infoDeskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizers
    ADD CONSTRAINT "organizers_infoDeskId_fkey" FOREIGN KEY ("infoDeskId") REFERENCES public.booths(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: organizers organizers_landingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizers
    ADD CONSTRAINT "organizers_landingId_fkey" FOREIGN KEY ("landingId") REFERENCES public.landings(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: organizers organizers_lobbyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizers
    ADD CONSTRAINT "organizers_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES public.lobbies(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: resourceHubs resourceHubs_assetId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."resourceHubs"
    ADD CONSTRAINT "resourceHubs_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: resourceHubs resourceHubs_boothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."resourceHubs"
    ADD CONSTRAINT "resourceHubs_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES public.booths(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: rolePermissions rolePermissions_permissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."rolePermissions"
    ADD CONSTRAINT "rolePermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public.permissions(id) ON UPDATE CASCADE;


--
-- Name: rolePermissions rolePermissions_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."rolePermissions"
    ADD CONSTRAINT "rolePermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE;


--
-- Name: routes routes_permissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT "routes_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public.permissions(id) ON UPDATE CASCADE;


--
-- Name: tests sceneAssets_assetId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT "sceneAssets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sceneAssets sceneAssets_assetId_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneAssets"
    ADD CONSTRAINT "sceneAssets_assetId_fkey1" FOREIGN KEY ("assetId") REFERENCES public.assets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sceneAssets sceneAssets_boothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneAssets"
    ADD CONSTRAINT "sceneAssets_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES public.booths(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sceneAssets sceneAssets_hallId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneAssets"
    ADD CONSTRAINT "sceneAssets_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES public.halls(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sceneAssets sceneAssets_lobbyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneAssets"
    ADD CONSTRAINT "sceneAssets_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES public.lobbies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tests sceneAssets_stageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT "sceneAssets_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES public.stages(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sceneAssets sceneAssets_stageId_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneAssets"
    ADD CONSTRAINT "sceneAssets_stageId_fkey1" FOREIGN KEY ("stageId") REFERENCES public.stages(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sceneModels sceneModels_boothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneModels"
    ADD CONSTRAINT "sceneModels_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES public.booths(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sceneModels sceneModels_hallId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneModels"
    ADD CONSTRAINT "sceneModels_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES public.halls(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sceneModels sceneModels_lobbyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sceneModels"
    ADD CONSTRAINT "sceneModels_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES public.lobbies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stages stages_lobbyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stages
    ADD CONSTRAINT "stages_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES public.lobbies(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: stages stages_sceneTemplateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stages
    ADD CONSTRAINT "stages_sceneTemplateId_fkey" FOREIGN KEY ("sceneTemplateId") REFERENCES public."sceneTemplates"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: tokens tokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: users users_boothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES public.booths(id);


--
-- Name: users users_organizerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES public.organizers(id);


--
-- Name: users users_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: visits visits_boothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES public.booths(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: visits visits_hallId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES public.halls(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: visits visits_stageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES public.stages(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: visits visits_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

