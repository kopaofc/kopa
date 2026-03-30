# Monte Seu Copão - Site Moderno

Um site de pedido de copão personalizado com design inspirado em apps de delivery, agora com personalização avançada e correções de bugs.

## ✨ Características

- **Personalização Completa**: Escolha doses, energéticos múltiplos, gelo e dados pessoais
- **Interface Moderna**: Design dark com gradientes dourados e animações suaves
- **Seleção Inteligente**: Sistema de quantidade com controles +/- e validações
- **Upsell Automático**: Sugestões inteligentes de produtos complementares
- **Responsivo**: Layout adaptado para mobile (prioridade total)
- **Conversão Otimizada**: Botão WhatsApp com validações e mensagens formatadas

## 🛠️ Tecnologias

- HTML5 (semântico e acessível)
- CSS3 (variáveis, gradientes, animações)
- JavaScript (Vanilla, com proteções contra erros)
- Google Fonts (Outfit + Space Grotesk)

## 📱 Estrutura do Fluxo

1. **🍸 Escolha sua dose**
   - Vodka (R$8)
   - Whisky (R$12) 🔥 Top
   - Gin (R$10)
   - Tequila (R$10)
   - Rum (R$8)
   - Saquê (R$14)

2. **⚡ Escolha o energético**
   - Red Bull (R$12) 🔥 Top
   - Monster (R$10)
   - TNT Energy (R$7)
   - Fusion (R$9)

3. **🧊 Quantidade de gelo**
   - Sem gelo
   - Pouco gelo
   - Normal
   - Muito gelo

4. **📝 Seus dados**
   - Nome
   - Bairro/Endereço

## 🚀 Como Usar

1. Abra `index.html` no navegador
2. Selecione doses e energéticos (quantidade ilimitada)
3. Escolha quantidade de gelo
4. Preencha nome e bairro
5. Clique em "ENVIAR PEDIDO PARA WHATSAPP"

## 🎨 Design System

- **Cores**: Fundo escuro (#0d0d0d), dourado (#d4a017), cinzas (#1f1f1f, #8a7a5a)
- **Tipografia**: Space Grotesk (títulos) + Outfit (corpo)
- **Espaçamento**: Bordas arredondadas (0.75rem), sombras suaves
- **Animações**: Transições de 0.3s, efeitos slideUp e popIn

## 📊 Funcionalidades Técnicas

- **Estado Reativo**: Atualização automática da UI baseada no estado
- **Validações**: Campos obrigatórios e seleções mínimas
- **Proteções**: Verificações de elementos DOM antes de manipular
- **Upsell**: Sugestão automática de energéticos quando só doses são selecionadas
- **Mensagens WhatsApp**: Formatação rica com emojis e formatação

## 💰 Lógica de Preços

- **Doses**: Preço unitário × quantidade selecionada
- **Energéticos**: Preço unitário × quantidade selecionada
- **Gelo**: Gratuito (só informativo)
- **Total**: Soma automática atualizada em tempo real

## 🔧 Correções Implementadas

- **Proteções DOM**: Verificações `if (!element) return` em todas as funções
- **Event Listeners Seguros**: Verificações antes de adicionar listeners
- **Estado Consistente**: Prevenção de estados inválidos
- **Mensagens de Erro**: Toast notifications para feedback do usuário
- **Acessibilidade**: Lang="pt-br", meta description, estrutura semântica

## 📈 Otimizações de Conversão

- Microcopy persuasivo ("Clientes também adicionam")
- Badges visuais ("🔥 Top") para produtos populares
- Validações inteligentes com mensagens claras
- Botão WhatsApp desabilitado até seleção válida
- Formatação rica da mensagem para WhatsApp</content>
<parameter name="filePath">c:\Users\felip\OneDrive\Documentos\GitHub\kopa\README.md