/*global window,console,define */
define([
	'bean',
	'bonzo',
	'modules/$'
], function (
	bean,
	bonzo,
	$
) {
	'use strict';

	var modules = {
			setupGlobals: function () {
				// Function that loops through comments, hides replies and enables interactivity for comments
				window.commentsReplyFormatting = function () {
					var counter = 0;
					var stopPropagation = 0;

					$(".discussion__thread").each(function(el) {
						if (!$(this).hasClass("discussion__thread--checked")) {
							if (typeof $(this)[0].children[4] !== "undefined") {
								var blockID = "#" + $(this)[0].children[3].id;
								var numOfComments = $(this)[0].children.length - 4;
								if (numOfComments == 1) {
									$(this).addClass("discussion__thread--orphan");
								} else {
									$(blockID).append("<div class='discussion__view-more'><span class='icon'>&#xe050;</span> Show " + numOfComments + " more replies</div>");
								}
							}
						}
						$(this).addClass("discussion__thread--checked");
					});

					$(".discussion").each(function(el) {

						bean.on(el, 'click', 'a, .discussion__view-more, .discussion__reply, .discussion__recommend', function (event) {
							stopPropagation = 1;
						});

						bean.on(el, 'click', '.discussion__header, .discussion__body', function (event) {
							stopPropagation = 0;
						});

						bean.on(el, 'click', function () {
							if (stopPropagation == 0) {
								var block = $(el);
								// If comment is replyable allow buttons
								if (block.hasClass('visible')) {
									// Remove any previous animation classes
									$(".discussion__options").removeClass("animated fadeInRight");
									$(".discussion__timestamp").removeClass("animated scaleOut");
									if (block.hasClass("discussion--open")) {
										// Hide the buttons
										block.removeClass("discussion--open");
									} else {
										// Hide previously opened block
										$(".discussion--open").removeClass("discussion--open");
										// Different animations for different block types
										if (block.hasClass("is-response")) {
											$(".discussion__timestamp", el).addClass("animated scaleOut");
											$('.discussion__options', el).addClass("animated fadeInRight");
										} else {
											// Calculate height to animate initial comments
											var originalHeight = block[0].clientHeight;
											// 110px is the smallest height an initial comment can be with options expanded
											if (originalHeight > 110) {
												block.css("min-height", originalHeight + 46);
											} else {
												block.css("min-height", "110px");
											}
											setTimeout(function() {
												$('.discussion__options', el).addClass("animated fadeInRight");
												block.css("min-height", originalHeight);
											}, 350);
										}
										block.addClass('discussion--open');
									}
								}
							}
						});

						bean.on(el, 'click', '.discussion__view-more', function () {
							$(this).hide();
							$(this).parent().parent().addClass("expand");
						});
						
					});
				};
				// Global functions to handle comments, called by native code
				window.articleCommentsInserter = function (html) {
					$('.discussion__loading').hide();
					if (!html) {
						$('.discussion__empty').show();
					} else {
						html = bonzo.create(html);
						$(html).appendTo($('#comments .container__body'));
						commentsReplyFormatting();
					}
				};
				window.commentsInserter = function (html) {
					if (!html) {
						$('.discussion__empty').show();
						$('.discussion__loading').hide();
					} else {
						html = bonzo.create(html);
						$(html).appendTo($('#comments .container__body'));
						commentsReplyFormatting();
					}
					$('.discussion__loading').appendTo('#comments .container__body');
				};
				window.articleCommentsFailed = function () {
					$('.discussion__failed').show();
					$('.discussion__loading').hide();
					$('#comments').addClass('comments-has-failed');
				};
				window.commentsFailed = function () {
					$('.discussion__loading').hide();
					$('.discussion__failed').show();
					$('#comments .container__body').addClass('comments-has-failed');
				};
				window.commentsEnd = function () {
					$('.discussion__loading').remove();
				};

				window.commentsClosed = function () {
					$("#comments, #discussion").addClass("comments--closed");
				};
				
				// Functions for feedback on recommend buttons
				window.commentsRecommendIncrease = function (id, number) {
					var target = '#' + id + ' .discussion__recommend';
					$(target).addClass('increase');
					$(target + ' .discussion__recommend__count').text(number);
				};
				window.commentsRecommendDecrease = function (id, number) {
					var target = '#' + id + ' .discussion__recommend';
					$(target).removeClass('increase');
					$(target + ' .discussion__recommend__count').text(number);
				};
				window.scrollToComments = function () {
					window.location.href = '#comments';
				};
				window.applyNativeFunctionCall('articleCommentsInserter');
				window.applyNativeFunctionCall('commentsFailed');
				window.applyNativeFunctionCall('commentsClosed');
				window.applyNativeFunctionCall('articleCommentsFailed');
			}
		},

		ready = function () {
			if (!this.initialised) {
				this.initialised = true;
				modules.setupGlobals();
				// console.info("Comments ready");
			}
		};

	return {
		init: ready
	};

});
