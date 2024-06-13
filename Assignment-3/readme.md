O projeto de raytracer abrange a implementação de um sistema de renderização que simula a interação de raios de luz com objetos tridimensionais, com o objetivo de gerar imagens realistas. Aqui está um resumo abrangente do projeto:

### Objetivo Principal
Desenvolver um raytracer capaz de renderizar cenas tridimensionais com diferentes materiais, iluminação e efeitos visuais, utilizando GLSL (OpenGL Shading Language) para programação de shaders.

### Funcionalidades Implementadas

1. **Interseção de Raios**
   - Implementação das funções para determinar interseções entre raios e diferentes formas geométricas, como esferas, triângulos, planos, cilindros e cones.

2. **Sombreamento**
   - Implementação de sombras rígidas e sombras suaves (soft shadows) para simular a ocultação de luz por objetos.

3. **Materiais**
   - **Lambertiano**: Cálculo de cores difusas baseadas em reflexão lambertiana.
   - **Phong**: Adição de termos especulares para reflexão de destaque (shininess e especularidade).
   - **Checkerboard**: Criação de padrões de tabuleiro de xadrez em superfícies.
   - **Especial (Perlin Noise)**: Implementação de texturas procedurais usando ruído Perlin para superfícies especiais.

4. **Câmera e Projeção**
   - Definição de câmeras para capturar a cena renderizada e projeções perspectiva para simular a visão humana.

5. **Iluminação**
   - Cálculo da contribuição da luz ambiente e direcional com atenuação de luz baseada na distância.

6. **Cenas Personalizadas e Animação**
   - Criação de cenas personalizadas utilizando objetos definidos em formato JSON.
   - Animação de cenas através do uso de variáveis de tempo para produzir movimentos e mudanças ao longo do tempo.

7. **Performance e Otimização**
   - Implementação de técnicas para otimização de desempenho, como pré-cálculo de interseções e redução de cálculos redundantes.

### Arte e Estética

- Participação em um concurso de arte, onde os participantes criam cenas personalizadas, animações e efeitos visuais utilizando as capacidades do raytracer.

### Conclusão

O projeto de raytracer é uma exploração profunda dos princípios de computação gráfica, focando na simulação realista da interação da luz com objetos. A implementação de diferentes técnicas de shading, interseção de raios e efeitos de luz permite aos desenvolvedores explorar e entender melhor os conceitos fundamentais por trás da renderização de imagens computacionais.
