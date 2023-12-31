PGDMP     '    1            
    {           db_study_app    12.14    12.14 0    >           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            @           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            A           1262    32855    db_study_app    DATABASE     �   CREATE DATABASE db_study_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
    DROP DATABASE db_study_app;
                postgres    false            �            1259    32927    shared_topics_users    TABLE     �   CREATE TABLE public.shared_topics_users (
    user_shared integer NOT NULL,
    user_received integer NOT NULL,
    topic_id integer NOT NULL,
    id integer NOT NULL
);
 '   DROP TABLE public.shared_topics_users;
       public         heap    postgres    false            �            1259    32925    shared_topics_users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.shared_topics_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.shared_topics_users_id_seq;
       public          postgres    false    211            B           0    0    shared_topics_users_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.shared_topics_users_id_seq OWNED BY public.shared_topics_users.id;
          public          postgres    false    210            �            1259    32890    themes    TABLE       CREATE TABLE public.themes (
    id integer NOT NULL,
    create_date timestamp without time zone,
    topic_id integer,
    name character varying,
    description character varying,
    keywords character varying,
    avatar character varying,
    owner_user_id integer
);
    DROP TABLE public.themes;
       public         heap    postgres    false            �            1259    32888    themes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.themes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.themes_id_seq;
       public          postgres    false    207            C           0    0    themes_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.themes_id_seq OWNED BY public.themes.id;
          public          postgres    false    206            �            1259    32911    themes_properties    TABLE     �   CREATE TABLE public.themes_properties (
    id integer NOT NULL,
    theme_id integer,
    property_name character varying,
    property_value character varying,
    owner_user_id integer NOT NULL
);
 %   DROP TABLE public.themes_properties;
       public         heap    postgres    false            �            1259    32909    themes_properties_id_seq    SEQUENCE     �   CREATE SEQUENCE public.themes_properties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.themes_properties_id_seq;
       public          postgres    false    209            D           0    0    themes_properties_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.themes_properties_id_seq OWNED BY public.themes_properties.id;
          public          postgres    false    208            �            1259    32869    topics    TABLE     &  CREATE TABLE public.topics (
    id integer NOT NULL,
    create_date timestamp without time zone,
    name character varying,
    topic_id integer,
    "order" integer,
    priority integer,
    color character varying,
    owner_user_id integer,
    order_index integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.topics;
       public         heap    postgres    false            �            1259    32867    topics_id_seq    SEQUENCE     �   CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.topics_id_seq;
       public          postgres    false    205            E           0    0    topics_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;
          public          postgres    false    204            �            1259    32858    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    last_name character varying,
    avatar character varying,
    email character varying,
    password character varying,
    deleted boolean,
    token character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    32856    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            F           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            �
           2604    32930    shared_topics_users id    DEFAULT     �   ALTER TABLE ONLY public.shared_topics_users ALTER COLUMN id SET DEFAULT nextval('public.shared_topics_users_id_seq'::regclass);
 E   ALTER TABLE public.shared_topics_users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            �
           2604    32893 	   themes id    DEFAULT     f   ALTER TABLE ONLY public.themes ALTER COLUMN id SET DEFAULT nextval('public.themes_id_seq'::regclass);
 8   ALTER TABLE public.themes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �
           2604    32914    themes_properties id    DEFAULT     |   ALTER TABLE ONLY public.themes_properties ALTER COLUMN id SET DEFAULT nextval('public.themes_properties_id_seq'::regclass);
 C   ALTER TABLE public.themes_properties ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            �
           2604    32872 	   topics id    DEFAULT     f   ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);
 8   ALTER TABLE public.topics ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            �
           2604    32861    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            ;          0    32927    shared_topics_users 
   TABLE DATA           W   COPY public.shared_topics_users (user_shared, user_received, topic_id, id) FROM stdin;
    public          postgres    false    211   0:       7          0    32890    themes 
   TABLE DATA           o   COPY public.themes (id, create_date, topic_id, name, description, keywords, avatar, owner_user_id) FROM stdin;
    public          postgres    false    207   W:       9          0    32911    themes_properties 
   TABLE DATA           g   COPY public.themes_properties (id, theme_id, property_name, property_value, owner_user_id) FROM stdin;
    public          postgres    false    209   t:       5          0    32869    topics 
   TABLE DATA           w   COPY public.topics (id, create_date, name, topic_id, "order", priority, color, owner_user_id, order_index) FROM stdin;
    public          postgres    false    205   �:       3          0    32858    users 
   TABLE DATA           ]   COPY public.users (id, name, last_name, avatar, email, password, deleted, token) FROM stdin;
    public          postgres    false    203   �:       G           0    0    shared_topics_users_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.shared_topics_users_id_seq', 21, true);
          public          postgres    false    210            H           0    0    themes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.themes_id_seq', 5, true);
          public          postgres    false    206            I           0    0    themes_properties_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.themes_properties_id_seq', 21, true);
          public          postgres    false    208            J           0    0    topics_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.topics_id_seq', 13, true);
          public          postgres    false    204            K           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    202            �
           2606    32932 ,   shared_topics_users shared_topics_users_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.shared_topics_users
    ADD CONSTRAINT shared_topics_users_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.shared_topics_users DROP CONSTRAINT shared_topics_users_pkey;
       public            postgres    false    211            �
           2606    32898    themes themes_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.themes DROP CONSTRAINT themes_pkey;
       public            postgres    false    207            �
           2606    32919 (   themes_properties themes_properties_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.themes_properties
    ADD CONSTRAINT themes_properties_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.themes_properties DROP CONSTRAINT themes_properties_pkey;
       public            postgres    false    209            �
           2606    32877    topics topics_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.topics DROP CONSTRAINT topics_pkey;
       public            postgres    false    205            �
           2606    32866    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            �
           2606    32933 *   shared_topics_users shared_topics_users_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.shared_topics_users
    ADD CONSTRAINT shared_topics_users_fk FOREIGN KEY (user_shared) REFERENCES public.users(id);
 T   ALTER TABLE ONLY public.shared_topics_users DROP CONSTRAINT shared_topics_users_fk;
       public          postgres    false    2722    203    211            �
           2606    32938 ,   shared_topics_users shared_topics_users_fk_1    FK CONSTRAINT     �   ALTER TABLE ONLY public.shared_topics_users
    ADD CONSTRAINT shared_topics_users_fk_1 FOREIGN KEY (user_received) REFERENCES public.users(id);
 V   ALTER TABLE ONLY public.shared_topics_users DROP CONSTRAINT shared_topics_users_fk_1;
       public          postgres    false    211    2722    203            �
           2606    32943 ,   shared_topics_users shared_topics_users_fk_2    FK CONSTRAINT     �   ALTER TABLE ONLY public.shared_topics_users
    ADD CONSTRAINT shared_topics_users_fk_2 FOREIGN KEY (topic_id) REFERENCES public.topics(id);
 V   ALTER TABLE ONLY public.shared_topics_users DROP CONSTRAINT shared_topics_users_fk_2;
       public          postgres    false    211    205    2724            �
           2606    32899     themes themes_owner_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_owner_user_id_fkey FOREIGN KEY (owner_user_id) REFERENCES public.users(id);
 J   ALTER TABLE ONLY public.themes DROP CONSTRAINT themes_owner_user_id_fkey;
       public          postgres    false    207    2722    203            �
           2606    32920 1   themes_properties themes_properties_theme_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.themes_properties
    ADD CONSTRAINT themes_properties_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id);
 [   ALTER TABLE ONLY public.themes_properties DROP CONSTRAINT themes_properties_theme_id_fkey;
       public          postgres    false    207    2726    209            �
           2606    32948 +   themes_properties themes_properties_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.themes_properties
    ADD CONSTRAINT themes_properties_user_id FOREIGN KEY (owner_user_id) REFERENCES public.users(id) NOT VALID;
 U   ALTER TABLE ONLY public.themes_properties DROP CONSTRAINT themes_properties_user_id;
       public          postgres    false    209    2722    203            �
           2606    32904    themes themes_topic_fk    FK CONSTRAINT     w   ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_topic_fk FOREIGN KEY (topic_id) REFERENCES public.topics(id);
 @   ALTER TABLE ONLY public.themes DROP CONSTRAINT themes_topic_fk;
       public          postgres    false    207    2724    205            �
           2606    32878     topics topics_owner_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_owner_user_id_fkey FOREIGN KEY (owner_user_id) REFERENCES public.users(id);
 J   ALTER TABLE ONLY public.topics DROP CONSTRAINT topics_owner_user_id_fkey;
       public          postgres    false    203    2722    205            �
           2606    32883    topics topics_topic_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id);
 E   ALTER TABLE ONLY public.topics DROP CONSTRAINT topics_topic_id_fkey;
       public          postgres    false    205    2724    205            ;      x�3�4�44�42����� ��      7      x������ � �      9      x������ � �      5   ]   x�34�4202�54�54S00�#N��Ģļ�k9c�8�8M9��RML�89�:�:|KRs/,�LNi*�T6L12KL��b���� ?yc      3     x�e�Ms�0E�῔!0t�]����T�|���<$�:����t��[�s�}&Z@AѢ�Z���7��q��3mƮ��P�-}�
���a�Bgi�flD���lR��{����+�:� <r����	��!���%���
��v��A��D�%�����VXg���'�dg$�_�g�g�x�lT�"�Ӹ��j!�����XG���ݎ9��0枲��&ac��+�.��������'2���O����!�����_��#�n�(d����T�:Jjh']Ӵ��q�     