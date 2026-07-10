# imagem do Nginx como base
FROM nginx:alpine

# Remove qualquer arquivo padrão que venha na pasta pública do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia todos os arquivos locais do site (HTML, CSS, imagens) para dentro do container
COPY . /usr/share/nginx/html/

# Indica que o container vai rodar internamente na porta 80
EXPOSE 80

# Mantém o servidor Nginx rodando em primeiro plano dentro do container
CMD ["nginx", "-g", "daemon off;"]