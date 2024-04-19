`Clump`
1. **Parâmetros**:
   - `val`: Este é o valor que desejamos "clampar", ou seja, garantir que ele esteja dentro de um intervalo específico.
   - `min`: Este é o valor mínimo permitido no intervalo.
   - `max`: Este é o valor máximo permitido no intervalo.

2. **Lógica**:
   - A função verifica se o valor `val` está abaixo do mínimo permitido `min`. Se estiver, retorna o valor `min`, garantindo que não seja menor que o mínimo permitido.
   - Se o valor `val` estiver acima do máximo permitido `max`, retorna o valor `max`, garantindo que não seja maior que o máximo permitido.
   - Se o valor `val` estiver dentro do intervalo `[min, max]`, retorna o próprio `val`.
   - Essa verificação é realizada utilizando a expressão condicional ternária `(val < min) ? min : ((val > max) ? max : val)`, que é uma forma mais compacta de escrever um bloco if-else.

3. **Exemplo de Uso**:
   - No exemplo fornecido, temos um valor `valor` igual a `25`, e queremos garantir que esteja dentro do intervalo `[0, 50]`.
   - Chamamos a função `clamp` com os argumentos `valor`, `minimo = 0` e `maximo = 50`.
   - O valor retornado será `25`, pois `25` está dentro do intervalo `[0, 50]`.
   - Isso é útil para garantir que um valor permaneça dentro de certos limites, por exemplo, ao definir valores de posição, cor ou qualquer outra propriedade que tenha limites específicos.

BrushFilter
`brushFilter`:

1. **Parâmetros**:
   - `image`: A imagem na qual o filtro será aplicado.
   - `radius`: O raio do pincel, determinando a área de influência do efeito.
   - `color`: A cor sólida do pincel.
   - `vertsString`: Uma string que contém as coordenadas dos centros dos círculos onde o efeito será aplicado.

2. **Funcionalidade**:
   - A função `brushFilter` desenha círculos sólidos com base nos centros fornecidos.
   - Para cada centro de círculo fornecido, a função percorre uma área quadrada com lados de tamanho `radius * 2 + 1` (para garantir que todos os pixels dentro do raio sejam considerados).
   - Para cada pixel dentro desse quadrado, a função verifica se o pixel está dentro do círculo usando a equação do círculo.
   - Se o pixel estiver dentro do círculo, sua cor é definida como a cor sólida especificada na entrada da função.

3. **Exemplo de Uso**:
   - Podemos usar esta função para criar pinceladas sólidas em uma imagem, como desenhar círculos ou aplicar manchas de cor sólida em áreas específicas da imagem. Este filtro é útil para adicionar elementos gráficos simples com uma cor sólida em uma determinada região da imagem.
