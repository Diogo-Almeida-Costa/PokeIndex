import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card} from 'react-bootstrap';
import * as artigoServices from '../services/artigoServices';
import type { Artigo } from '../types/artigo.types'

export const PaginaFormularioArtigo: React.FC = () =>
{
    const { artigoId } = useParams<{ artigoId: string }>();
    const navigate = useNavigate();

    const [dadosForms, setDadosForms] = useState<Omit<Artigo, 'id'>>({
        titulo: '',
        resumo: '',
        conteudo: '',
        imagem: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditing = Boolean(artigoId);

    useEffect(() => 
    {
        if(isEditing && artigoId) 
        {
            const fetchArtigo = async () =>
            {
              const artigoExistente = await artigoServices.searchArtigo(artigoId);
              if(artigoExistente)
              {
                  const { id, ...dadosArtigo } = artigoExistente;
                  setDadosForms(dadosArtigo);
              }
            };
            fetchArtigo();
        }
    }, [artigoId, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    {
        const { name, value } = e.target;
        setDadosForms(prev => ({ ...prev, [name]: value}));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const file = e.target.files?.[0];
        if(file)
        {
            const reader = new FileReader();
            reader.onloadend = () =>
            {
                setDadosForms(prev => ({...prev, imagem: reader.result as string}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        setIsSubmitting(true);
        try
        {
          if(isEditing && artigoId)
            {
                await artigoServices.atualizarArtigo({id: artigoId, ...dadosForms});
                alert("Artigo atualizado com sucesso");
            }
            else
            {
                await artigoServices.addArtigo(dadosForms);
                alert("Artigo adicionado com sucesso");
            }
            navigate('/sobre');
        }
        catch(error)
        {
          console.error("Erro salvar artigo", error);
          alert("Falha salvar artigo");
          setIsSubmitting(false);
        }
    };

    return(
      <Container className="py-4">
      <Card className="form-card-modern">
        <Card.Body>
          <Card.Title as="h1" className="text-center mb-4">
            {isEditing ? 'Editar Artigo' : 'Adicionar Novo Artigo'}
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="titulo">
              <Form.Label>Título do Artigo</Form.Label>
              <Form.Control type="text" name="titulo" value={dadosForms.titulo} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="resumo">
              <Form.Label>Resumo</Form.Label>
              <Form.Control as="textarea" rows={3} name="resumo" value={dadosForms.resumo} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="conteudo">
              <Form.Label>Conteúdo Completo</Form.Label>
              <Form.Control as="textarea" rows={6} name="conteudo" value={dadosForms.conteudo} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imagem">
              <Form.Label>URL da Imagem ou Upload</Form.Label>
              <Form.Control type="text" name="imagem" placeholder="Cole a URL da imagem aqui" value={dadosForms.imagem} onChange={handleChange} />
              <Form.Text>OU</Form.Text>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="secondary" type="button" onClick={() => navigate('/sobre')} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Publicar Artigo')}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    );
};