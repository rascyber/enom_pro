(function (C) {
	var A           = function (Q) {
		var S = Q.rows;
		var K = S.length;
		var P = [];
		for (var I = 0; I < K; I++) {
			var R = S[I].cells;
			var O = R.length;
			for (var H = 0; H < O; H++) {
				var N = R[H];
				var M = N.rowSpan || 1;
				var J = N.colSpan || 1;
				var L = -1;
				if (!P[I]) {
					P[I] = []
				}
				var E = P[I];
				while (E[++L]) {
				}
				N.realIndex = L;
				for (var G = I; G < I + M; G++) {
					if (!P[G]) {
						P[G] = []
					}
					var D = P[G];
					for (var F = L; F < L + J; F++) {
						D[F] = 1
					}
				}
			}
		}
	};
	var B           = function (H) {
		var E = 0, F, D, G = (H.tHead) ? H.tHead.rows : 0;
		if (G) {
			for (F = 0; F < G.length; F++) {
				G[F].realRIndex = E++
			}
		}
		for (D = 0; D < H.tBodies.length; D++) {
			G = H.tBodies[D].rows;
			if (G) {
				for (F = 0; F < G.length; F++) {
					G[F].realRIndex = E++
				}
			}
		}
		G = (H.tFoot) ? H.tFoot.rows : 0;
		if (G) {
			for (F = 0; F < G.length; F++) {
				G[F].realRIndex = E++
			}
		}
	};
	C.fn.tableHover = function (D) {
		var E = C.extend({
			allowHead:  true,
			allowBody:  true,
			allowFoot:  true,
			headRows:   false,
			bodyRows:   true,
			footRows:   false,
			spanRows:   true,
			headCols:   false,
			bodyCols:   true,
			footCols:   false,
			spanCols:   true,
			ignoreCols: [],
			headCells:  false,
			bodyCells:  true,
			footCells:  false,
			rowClass:   "hover",
			colClass:   "",
			cellClass:  "",
			clickClass: ""
		}, D);
		return this.each(function () {
			var N = [], M = [], J = this, F, K = 0, O = [-1, -1];
			if (!J.tBodies || !J.tBodies.length) {
				return
			}
			var G = function (U, X) {
				var W, V, T, R, Q, S;
				for (T = 0; T < U.length; T++, K++) {
					V = U[T];
					for (R = 0; R < V.cells.length; R++) {
						W = V.cells[R];
						if ((X == "TBODY" && E.bodyRows) || (X == "TFOOT" && E.footRows) || (X == "THEAD" && E.headRows)) {
							S = W.rowSpan;
							while (--S >= 0) {
								M[K + S].push(W)
							}
						}
						if ((X == "TBODY" && E.bodyCols) || (X == "THEAD" && E.headCols) || (X == "TFOOT" && E.footCols)) {
							S = W.colSpan;
							while (--S >= 0) {
								Q = W.realIndex + S;
								if (C.inArray(Q + 1, E.ignoreCols) > -1) {
									break
								}
								if (!N[Q]) {
									N[Q] = []
								}
								N[Q].push(W)
							}
						}
						if ((X == "TBODY" && E.allowBody) || (X == "THEAD" && E.allowHead) || (X == "TFOOT" && E.allowFoot)) {
							W.thover = true
						}
					}
				}
			};
			var L = function (R) {
				var Q = R.target;
				while (Q != this && Q.thover !== true) {
					Q = Q.parentNode
				}
				if (Q.thover === true) {
					H(Q, true)
				}
			};
			var I = function (R) {
				var Q = R.target;
				while (Q != this && Q.thover !== true) {
					Q = Q.parentNode
				}
				if (Q.thover === true) {
					H(Q, false)
				}
			};
			var P = function (T) {
				var R = T.target;
				while (R && R != J && !R.thover) {
					R = R.parentNode
				}
				if (R.thover && E.clickClass != "") {
					var Q = R.realIndex, U = R.parentNode.realRIndex, S = "";
					C("td." + E.clickClass + ", th." + E.clickClass, J).removeClass(E.clickClass);
					if (Q != O[0] || U != O[1]) {
						if (E.rowClass != "") {
							S += ",." + E.rowClass
						}
						if (E.colClass != "") {
							S += ",." + E.colClass
						}
						if (E.cellClass != "") {
							S += ",." + E.cellClass
						}
						if (S != "") {
							C("td, th", J).filter(S.substring(1)).addClass(E.clickClass)
						}
						O = [Q, U]
					} else {
						O = [-1, -1]
					}
				}
			};
			var H = function (R, T) {
				if (T) {
					C.fn.tableHoverHover = C.fn.addClass
				} else {
					C.fn.tableHoverHover = C.fn.removeClass
				}
				var V = N[R.realIndex] || [], S = [], U = 0, Q, W;
				if (E.colClass != "") {
					while (E.spanCols && ++U < R.colSpan && N[R.realIndex + U]) {
						V = V.concat(N[R.realIndex + U])
					}
					C(V).tableHoverHover(E.colClass)
				}
				if (E.rowClass != "") {
					Q = R.parentNode.realRIndex;
					if (M[Q]) {
						S = S.concat(M[Q])
					}
					U = 0;
					while (E.spanRows && ++U < R.rowSpan) {
						if (M[Q + U]) {
							S = S.concat(M[Q + U])
						}
					}
					C(S).tableHoverHover(E.rowClass)
				}
				if (E.cellClass != "") {
					W = R.parentNode.parentNode.nodeName.toUpperCase();
					if ((W == "TBODY" && E.bodyCells) || (W == "THEAD" && E.headCells) || (W == "TFOOT" && E.footCells)) {
						C(R).tableHoverHover(E.cellClass)
					}
				}
			};
			A(J);
			B(J);
			for (F = 0; F < J.rows.length; F++) {
				M[F] = []
			}
			if (J.tHead) {
				G(J.tHead.rows, "THEAD")
			}
			for (F = 0; F < J.tBodies.length; F++) {
				G(J.tBodies[F].rows, "TBODY")
			}
			if (J.tFoot) {
				G(J.tFoot.rows, "TFOOT")
			}
			C(this).bind("mouseover", L).bind("mouseout", I).click(P)
		})
	}
})(jQuery);