(function () {
  var columns = [];

  function init() {
    addColumn();
    addColumn();
    addColumn();
  }

  /**
   * Remove a list.
   *
   * @param i int ID of the list to remove.
   */
  function dropColumn(i) {
    var el = columns[i];
    columns[i] = false;
    document.body.removeChild(el);
  }

  /**
   * Swap Columns
   *
   * Takes two columns and swaps the second column to be in front of the
   * first.
   *
   * @param a int ID of the first column to be swapped
   * @param b int ID of the second column to bet swapped
   */
  function swapColumns(a, b)
  {
    var colA = columns[a];
    var colB = columns[b];

    colA.setAttribute('column', b);
    colB.setAttribute('column', a);

    document.body.insertBefore(colB, colA);
    columns[a] = colB;
    columns[b] = colA;
  }

  /**
   * Add Column
   *
   * Adds a new list to the page for creating larger combinations
   */
  function addColumn() {
    var num  = (columns.length+1);
    var name = "List " + num;
    var id   = "list"  + num;

    var div  = document.createElement('div');
    var h2   = document.createElement('h2');
    var text = document.createElement('textarea');
    var butt = document.createElement('button');
    var butb = document.createElement('button');
    var butf = document.createElement('button');

    // Setup Header
    h2.setAttribute('contenteditable', 'true');
    h2.appendChild(document.createTextNode(name));

    // Setup textarea
    text.id = id;
    text.setAttribute('tabindex', num);

    // Setup back swap button
    butb.appendChild(document.createTextNode('<<'));
    butb.classList.add('swapBackward');

    // Setup forward swap button
    butf.appendChild(document.createTextNode('>>'));
    butf.classList.add('swapForward');

    // Setup remove column button
    butt.appendChild(document.createTextNode('Remove'));
    butt.setAttribute('column', columns.length);
    butt.classList.add('remover');

    // Setup Container
    div.classList.add('floatBox');
    div.setAttribute('column', columns.length);
    div.appendChild(h2);
    div.appendChild(text);
    div.appendChild(butb);
    div.appendChild(butt);
    div.appendChild(butf);

    columns.push(div);
    document.body.insertBefore(div, document.getElementById("output"));
  }

  /**
   * Make Combo String
   *
   * Combines a random item from each of the available lists.
   */
  function combine() {
    var
      output = '',
      split,
      count,
      rand,
      list;

    for (var i = 0; i < columns.length; i++) {

      if (!columns[i]) {
        continue;
      }

      list = columns[i].querySelector('textarea');
      split = list.value.trim().split('\n');
      count = split.length-1;
      rand  = Math.round(Math.random()*count);
      output += split[rand] + ' ';
    }

    document.getElementById('out').value = output.trim();
  }

  document.addEventListener('click', function (e) {
    var target = e.target;
    var c = target.classList;

    if (c.contains('remover')) {
      dropColumn(e.target.getAttribute('column'));
      return;
    }

    if (target.id == 'addColumn') {
      addColumn();
      return;
    }

    if (target.id == 'match') {
      combine();
      return;
    }

    if (c.contains('swapForward')) {
      var parent = target.parentElement;

      if (!parent.nextSibling instanceof Element || !parent.nextSibling.classList || !parent.nextSibling.classList.contains('floatBox')) {
        return;
      }

      swapColumns(parent.getAttribute('column'), parent.nextSibling.getAttribute('column'));
      return;
    }

    if (c.contains('swapBackward')) {
      var parent = target.parentElement;

      if (!parent.previousSibling instanceof Element || !parent.previousSibling.classList || !parent.previousSibling.classList.contains('floatBox')) {
        return;
      }

      swapColumns(parent.previousSibling.getAttribute('column'), parent.getAttribute('column'));
      return;
    }
  });

  init();
})();
