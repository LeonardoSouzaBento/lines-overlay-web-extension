import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Função para iniciar a injeção do componente na página
function injectExtension() {
  const containerId = 'lines-overlay-extension-root';

  // Evita múltiplas injeções
  if (document.getElementById(containerId)) return;

  const hostElement = document.createElement('div');
  hostElement.id = containerId;
  document.body.appendChild(hostElement);

  const shadowRoot = hostElement.attachShadow({ mode: 'open' });
  const renderRoot = document.createElement('div');
  shadowRoot.appendChild(renderRoot);

  const root = createRoot(renderRoot);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // Ouve um evento para desmontar e remover completamente o container host
  window.addEventListener('lines-overlay-dismount', () => {
    root.unmount();
    hostElement.remove();
  }, { once: true });
}

injectExtension();
